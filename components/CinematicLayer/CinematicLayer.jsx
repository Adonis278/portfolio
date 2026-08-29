"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./CinematicLayer.module.css";

/* -------------------------------------------------------------------------- */
/*  Shaders                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Each particle carries its own drift phase/amplitude so the field never
 * pulses in unison — the motion has to read as air, not as an animation.
 */
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2  uParallax;
  uniform float uReveal;

  attribute float aSize;
  attribute float aPhase;
  attribute float aDrift;
  attribute float aTint;
  attribute float aOpacity;

  varying float vTint;
  varying float vOpacity;

  void main() {
    vec3 pos = position;

    // Slow, layered sine drift. The three frequencies are intentionally
    // non-harmonic so the loop never becomes perceptible.
    float t = uTime * aDrift;
    pos.x += sin(t * 0.42 + aPhase) * 1.15;
    pos.y += cos(t * 0.31 + aPhase * 1.7) * 0.95;
    pos.z += sin(t * 0.23 + aPhase * 0.6) * 0.55;

    // Depth-scaled parallax: near bokeh swims further than distant motes.
    float depth = smoothstep(-22.0, 6.0, pos.z);
    pos.xy += uParallax * mix(0.35, 2.6, depth);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * (170.0 / -mvPosition.z);

    // Fade the furthest motes into the black so the field has real depth.
    float distanceFade = smoothstep(46.0, 12.0, -mvPosition.z);

    vTint = aTint;
    vOpacity = aOpacity * distanceFade * uReveal;
  }
`;

/**
 * Defocused-highlight falloff: a soft core with a wide, dim halo. A plain
 * gaussian reads as fog; the extra rim term is what makes it feel like glass.
 */
const fragmentShader = /* glsl */ `
  uniform vec3 uWarm;
  uniform vec3 uCool;
  uniform vec3 uWhite;

  varying float vTint;
  varying float vOpacity;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float core = pow(1.0 - smoothstep(0.0, 0.42, d), 2.4);
    float halo = pow(1.0 - smoothstep(0.0, 0.5, d), 6.0);
    float alpha = (core * 0.55 + halo * 0.75) * vOpacity;
    if (alpha < 0.002) discard;

    // vTint 0 -> warm practical, 1 -> white; a slice biases to monitor blue.
    vec3 base = mix(uWarm, uWhite, smoothstep(0.35, 1.0, vTint));
    vec3 color = mix(base, uCool, smoothstep(0.0, 0.18, 0.18 - vTint) * 0.85);

    // Hot centre keeps highlights from turning muddy under additive blending.
    color += uWhite * core * 0.28;

    gl_FragColor = vec4(color, alpha);
  }
`;

/* -------------------------------------------------------------------------- */
/*  Sprite texture                                                             */
/* -------------------------------------------------------------------------- */

/** Generated at runtime so the layer ships with zero image dependencies. */
function createBokehTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.55)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Transparent, additively-blended bokeh field rendered over the hero video.
 *
 * @param {object}  props
 * @param {import('react').RefObject<{x:number,y:number}>} props.pointer Normalized pointer ref.
 * @param {number}  [props.density] Particle count on desktop; scaled down on small screens.
 * @param {string}  [props.className]
 */
export default function CinematicLayer({ pointer, density = 900, className }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    // WebGL can be unavailable (older devices, hardened browsers). The hero
    // is fully legible without this layer, so fail silently.
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      return undefined;
    }

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isNarrow = window.innerWidth < 768;
    const count = Math.round(density * (isNarrow ? 0.42 : isCoarse ? 0.65 : 1));

    // Capping DPR at 1.5 is the single biggest win here — the field is soft
    // and defocused, so extra device pixels buy nothing visible.
    const maxPixelRatio = isNarrow ? 1.25 : 1.5;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      140
    );
    camera.position.set(0, 0, 26);

    /* --- geometry ------------------------------------------------------- */

    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const drifts = new Float32Array(count);
    const tints = new Float32Array(count);
    const opacities = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;

      // Bias particles toward the frame edges so the subject's face stays
      // clear — the video is the hero, this layer only frames it.
      const edgeBias = Math.random() ** 0.6;
      const angle = Math.random() * Math.PI * 2;
      const radius = 6 + edgeBias * 26;

      positions[i3] = Math.cos(angle) * radius * 1.35;
      positions[i3 + 1] = Math.sin(angle) * radius * 0.85;
      positions[i3 + 2] = -34 + Math.random() * 40;

      // A few large, very dim discs read as foreground defocus.
      const isForeground = Math.random() > 0.9;
      sizes[i] = isForeground ? 9 + Math.random() * 16 : 1.4 + Math.random() * 5;
      opacities[i] = isForeground
        ? 0.1 + Math.random() * 0.14
        : 0.18 + Math.random() * 0.5;

      phases[i] = Math.random() * Math.PI * 2;
      drifts[i] = 0.1 + Math.random() * 0.26;
      tints[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute("aDrift", new THREE.BufferAttribute(drifts, 1));
    geometry.setAttribute("aTint", new THREE.BufferAttribute(tints, 1));
    geometry.setAttribute("aOpacity", new THREE.BufferAttribute(opacities, 1));

    const texture = createBokehTexture();

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
        uParallax: { value: new THREE.Vector2(0, 0) },
        uReveal: { value: 0 },
        uWarm: { value: new THREE.Color("#ff8a3d") },
        uCool: { value: new THREE.Color("#4d7cff") },
        uWhite: { value: new THREE.Color("#fff4e6") },
      },
    });

    const points = new THREE.Points(geometry, material);
    // The field is hand-sorted by depth already; skipping frustum culling
    // avoids a per-frame bounding-sphere test on a mesh that never leaves view.
    points.frustumCulled = false;
    scene.add(points);

    /* --- loop ----------------------------------------------------------- */

    const clock = new THREE.Clock();
    let frameId = 0;
    let visible = true;
    let inViewport = true;
    const parallax = new THREE.Vector2(0, 0);
    const cameraTarget = new THREE.Vector2(0, 0);

    const render = () => {
      frameId = requestAnimationFrame(render);

      // A hidden tab or a scrolled-past hero should cost nothing.
      if (!visible || !inViewport) {
        clock.getDelta();
        return;
      }

      const delta = Math.min(clock.getDelta(), 0.1);
      const uniforms = material.uniforms;

      uniforms.uTime.value += delta * (prefersReducedMotion ? 0.15 : 1);

      // Ease the reveal in rather than popping the field on first frame.
      uniforms.uReveal.value = THREE.MathUtils.damp(
        uniforms.uReveal.value,
        1,
        1.1,
        delta
      );

      const px = pointer?.current?.x ?? 0;
      const py = pointer?.current?.y ?? 0;
      const strength = prefersReducedMotion ? 0 : 1;

      // Two coupled dampers: the field drifts one way, the camera counter-
      // moves slightly. That opposition is what sells the depth.
      parallax.x = THREE.MathUtils.damp(parallax.x, px * 1.5 * strength, 1.6, delta);
      parallax.y = THREE.MathUtils.damp(parallax.y, -py * 1.0 * strength, 1.6, delta);
      uniforms.uParallax.value.set(parallax.x, parallax.y);

      cameraTarget.x = THREE.MathUtils.damp(cameraTarget.x, -px * 1.15 * strength, 1.2, delta);
      cameraTarget.y = THREE.MathUtils.damp(cameraTarget.y, py * 0.75 * strength, 1.2, delta);
      camera.position.x = cameraTarget.x;
      camera.position.y = cameraTarget.y;
      camera.lookAt(0, 0, -6);

      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(render);

    /* --- lifecycle ------------------------------------------------------ */

    let resizeTimer = 0;
    const applySize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const onResize = () => {
      // Mobile browsers fire resize on every URL-bar nudge; debounce so we
      // are not rebuilding the drawing buffer mid-scroll.
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(applySize, 120);
    };

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const onContextLost = (event) => {
      event.preventDefault();
      cancelAnimationFrame(frameId);
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onContextLost);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      observer.disconnect();

      scene.remove(points);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [density, pointer, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={[styles.canvas, className].filter(Boolean).join(" ")}
    />
  );
}
