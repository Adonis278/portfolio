"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CinematicLayer from "@/components/CinematicLayer/CinematicLayer";
import GlassButton from "@/components/ui/GlassButton";
import {
  ArrowDownIcon,
  PauseIcon,
  PlayIcon,
  SoundOffIcon,
  SoundOnIcon,
} from "@/components/ui/Icons";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { usePointer } from "@/hooks/usePointer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { identity, media, resume } from "@/lib/site";
import styles from "./VideoIntro.module.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * How long the "tap for sound" hint lingers before retiring itself. Longer
 * than it needs to be for a silent loop: this cut carries Jerome's actual
 * voice, so the hint is now pointing at real content rather than ambience.
 */
const SOUND_HINT_TIMEOUT = 12000;
/** Max drift, in seconds, tolerated between the two video layers. */
const SYNC_TOLERANCE = 0.22;

/**
 * Sticky split hero: copy in the left column, the video in a card on the right.
 *
 * Two <video> elements share one source. The blurred one is the page's entire
 * backdrop — it supplies the colour and the glow the card sits inside — while
 * the sharp one plays at its native 16:9 inside the showcase frame. The
 * ambient layer is kept in step with the foreground rather than trusted to
 * stay in sync on its own.
 *
 * @param {object} props
 * @param {string} props.nextSectionId Anchor the scroll cue jumps to.
 */
export default function VideoIntro({ nextSectionId = "work" }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const plateRef = useRef(null);
  const videoRef = useRef(null);
  const ambientRef = useRef(null);
  const contentRef = useRef(null);
  const showcaseRef = useRef(null);
  const showcaseInnerRef = useRef(null);
  const cueRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [showSoundHint, setShowSoundHint] = useState(true);

  const prefersReducedMotion = usePrefersReducedMotion();
  const pointer = usePointer();

  /* ---------------------------------------------------------------------- */
  /*  Playback                                                               */
  /* ---------------------------------------------------------------------- */

  /** Mirrors any foreground playback change onto the ambient layer. */
  const syncAmbient = useCallback(() => {
    const video = videoRef.current;
    const ambient = ambientRef.current;
    if (!video || !ambient) return;

    if (Math.abs(ambient.currentTime - video.currentTime) > SYNC_TOLERANCE) {
      ambient.currentTime = video.currentTime;
    }

    if (video.paused && !ambient.paused) ambient.pause();
    if (!video.paused && ambient.paused) ambient.play().catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const ambient = ambientRef.current;
    if (!video || !ambient) return undefined;

    const onPlay = () => {
      setIsPlaying(true);
      syncAmbient();
    };
    const onPause = () => {
      setIsPlaying(false);
      ambient.pause();
    };
    const onReady = () => setIsReady(true);
    const onVolumeChange = () => setIsMuted(video.muted);
    // The two decoders drift over a long session; nudge on loop and on seek.
    const onSeekOrLoop = () => {
      ambient.currentTime = video.currentTime;
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("volumechange", onVolumeChange);
    video.addEventListener("seeked", onSeekOrLoop);
    video.addEventListener("timeupdate", syncAmbient);

    if (video.readyState >= 2) setIsReady(true);

    // Autoplay is only permitted while muted, and can still be refused.
    video.play().catch(() => setIsPlaying(false));

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("volumechange", onVolumeChange);
      video.removeEventListener("seeked", onSeekOrLoop);
      video.removeEventListener("timeupdate", syncAmbient);
    };
  }, [syncAmbient]);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    setShowSoundHint(false);

    // Unmuting is a user gesture — a good moment to recover from a refused
    // autoplay, so the sound the user just asked for actually arrives.
    if (!nextMuted && video.paused) {
      video.play().catch(() => {});
    }
  }, []);

  /* Retire the sound hint on its own after a beat. */
  useEffect(() => {
    if (!showSoundHint || !isMuted) return undefined;
    const timer = window.setTimeout(() => setShowSoundHint(false), SOUND_HINT_TIMEOUT);
    return () => window.clearTimeout(timer);
  }, [showSoundHint, isMuted]);

  /* ---------------------------------------------------------------------- */
  /*  Motion                                                                 */
  /* ---------------------------------------------------------------------- */

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    if (!root || !content) return undefined;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(`.${styles.reveal}`, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(cueRef.current, { opacity: 1, y: 0 });
        return;
      }

      /* --- entrance ---------------------------------------------------- */

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.35,
      });

      tl.from(stageRef.current, {
        scale: 1.08,
        opacity: 0,
        duration: 2.4,
        ease: "power2.out",
      })
        // The card lands early and slowly — it is the anchor the copy is
        // then dealt out alongside.
        .from(
          showcaseRef.current,
          { opacity: 0, y: 46, scale: 0.94, duration: 2, ease: "expo.out" },
          "-=2.1"
        )
        .from(
          `.${styles.tagline}`,
          { opacity: 0, y: 18, filter: "blur(8px)", duration: 1.4 },
          "-=1.7"
        )
        // Names wipe up from behind their own mask — the single most
        // "title card" gesture in the whole page.
        .from(
          `.${styles.nameLineInner}`,
          {
            yPercent: 118,
            duration: 1.7,
            stagger: 0.11,
          },
          "-=1.15"
        )
        .from(
          `.${styles.rule}`,
          { scaleX: 0, transformOrigin: "left center", duration: 1.5 },
          "-=1.25"
        )
        .from(
          `.${styles.subtitle}`,
          { opacity: 0, y: 22, filter: "blur(6px)", duration: 1.3 },
          "-=1.3"
        )
        .from(
          `.${styles.metaItem}`,
          { opacity: 0, y: 14, duration: 1.1, stagger: 0.08 },
          "-=1.1"
        )
        .from(
          `.${styles.control}`,
          { opacity: 0, y: 16, scale: 0.9, duration: 1.1, stagger: 0.08 },
          "-=1.0"
        )
        .from(cueRef.current, { opacity: 0, y: 20, duration: 1.2 }, "-=0.95");

      /* --- pointer parallax on the content block ------------------------ */

      const contentX = gsap.quickTo(content, "x", { duration: 1.1, ease: "power3.out" });
      const contentY = gsap.quickTo(content, "y", { duration: 1.1, ease: "power3.out" });
      const cardX = gsap.quickTo(showcaseInnerRef.current, "x", { duration: 1.2, ease: "power3.out" });
      const cardY = gsap.quickTo(showcaseInnerRef.current, "y", { duration: 1.2, ease: "power3.out" });
      const stageX = gsap.quickTo(stageRef.current, "x", { duration: 1.4, ease: "power3.out" });
      const stageY = gsap.quickTo(stageRef.current, "y", { duration: 1.4, ease: "power3.out" });

      // Driven off the shared pointer ref inside GSAP's own ticker so the
      // parallax never triggers a React render. The card and the copy move
      // against each other, and the backdrop moves with the pointer — three
      // planes separating is what reads as depth.
      const onTick = () => {
        const { x, y } = pointer.current;
        contentX(x * -14);
        contentY(y * -9);
        cardX(x * -22);
        cardY(y * -14);
        stageX(x * 12);
        stageY(y * 8);
      };
      gsap.ticker.add(onTick);

      /* --- scroll-driven exit ------------------------------------------- */

      // The hero doesn't just scroll away — it recedes and defocuses, so the
      // next section feels like a cut rather than a scroll.
      gsap.to(content, {
        yPercent: -14,
        opacity: 0,
        filter: "blur(12px)",
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      // The card leaves a beat later and travels further, so the two columns
      // separate on the way out instead of sliding off as one slab.
      //
      // This MUST target the inner element, not the same one the entrance
      // animates. A `.from()` renders its start state the moment it is
      // created, so the entrance had already set the outer element to
      // opacity 0; a scrubbed `.to()` built afterwards records that 0 as its
      // scroll-start value and faithfully restores it when you scroll back
      // up — leaving the video invisible. Splitting the elements means each
      // property has exactly one author.
      gsap.to(showcaseInnerRef.current, {
        yPercent: -22,
        opacity: 0,
        scale: 0.94,
        filter: "blur(10px)",
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
        },
      });

      // Scrubbed on .plate, not .stage: the entrance tween owns .stage's
      // scale for its first 2.4s, and scrolling during that window would put
      // two tweens on the same property.
      gsap.to(plateRef.current, {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      gsap.to(`.${styles.exitVeil}`, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      return () => gsap.ticker.remove(onTick);
    }, root);

    return () => ctx.revert();
  }, [pointer, prefersReducedMotion]);

  /* Pause the video once the hero is fully behind the next section. */
  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) return;
        if (!video.paused) {
          video.pause();
          // Remember that the pause was automatic, not user intent.
          video.dataset.autoPaused = "true";
        }
      },
      { threshold: 0 }
    );

    const onReenter = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (video.dataset.autoPaused === "true") {
          delete video.dataset.autoPaused;
          video.play().catch(() => {});
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(root);
    onReenter.observe(root);
    return () => {
      observer.disconnect();
      onReenter.disconnect();
    };
  }, []);

  /* ---------------------------------------------------------------------- */
  /*  Navigation                                                             */
  /* ---------------------------------------------------------------------- */

  const scrollToNext = useCallback(() => {
    const target = document.getElementById(nextSectionId);
    if (!target) return;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [nextSectionId, prefersReducedMotion]);

  /* ---------------------------------------------------------------------- */

  const soundLabel = isMuted ? "Unmute video" : "Mute video";
  const playLabel = isPlaying ? "Pause video" : "Play video";

  return (
    <section
      ref={rootRef}
      className={styles.root}
      aria-label={`${identity.firstName} ${identity.lastName}, introduction`}
    >
      <div className={styles.sticky}>
        <div
          className={`${styles.stage} ${isReady ? styles.stageReady : ""}`}
          ref={stageRef}
        >
          <div className={styles.plate} ref={plateRef}>
            {/* Ambient bed: the same frame, blown up and defocused. It is the
                whole backdrop — the colour and glow the card sits inside. */}
            <video
              ref={ambientRef}
              className={styles.ambient}
              src={media.hero}
              poster={media.heroPoster}
              muted
              loop
              playsInline
              preload="auto"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Grade stack — each layer does one job, all of them GPU-cheap. */}
        <div className={styles.grade} aria-hidden="true">
          <div className={styles.vignette} />
          <div className={styles.warmLight} />
          <div className={styles.monitorGlow} />
          <div className={styles.scrim} />
          <div className={styles.grain} />
        </div>

        <CinematicLayer pointer={pointer} />

        <div className={styles.exitVeil} aria-hidden="true" />

        {/* ---- columns -------------------------------------------------- */}

        <div className={styles.layout}>
          <div className={styles.content} ref={contentRef}>
            <div className={styles.contentInner}>
              <p className={`${styles.tagline} ${styles.reveal}`}>
                <span className={styles.taglineDot} aria-hidden="true" />
                {identity.tagline}
              </p>

              <h1 className={styles.name}>
                <span className={styles.nameLine}>
                  <span className={`${styles.nameLineInner} ${styles.reveal}`}>
                    {identity.firstName}
                  </span>
                </span>
                <span className={styles.nameLine}>
                  <span
                    className={`${styles.nameLineInner} ${styles.nameLineAccent} ${styles.reveal}`}
                  >
                    {identity.lastName}
                  </span>
                </span>
              </h1>

              <div className={`${styles.rule} ${styles.reveal}`} aria-hidden="true" />

              <p className={`${styles.subtitle} ${styles.reveal}`}>
                <strong className={styles.role}>{identity.role}</strong>
                <span className={styles.subtitleBody}>{identity.subtitle}</span>
              </p>

              {/* Résumé gets a filled button, not a text link: it is the single
                  most-clicked thing on a junior portfolio. */}
              <div className={`${styles.ctaRow} ${styles.reveal}`}>
                <a className={styles.ctaPrimary} href={resume.page}>
                  View Résumé
                </a>
                <a className={styles.ctaSecondary} href="#work">
                  See the work
                </a>
              </div>

              <ul className={styles.meta}>
                {identity.links.map((link) => (
                  <li key={link.label} className={`${styles.metaItem} ${styles.reveal}`}>
                    <a
                      className={styles.metaLink}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http") ? "noreferrer noopener" : undefined
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---- showcase card ------------------------------------------ */}

          <div className={styles.showcase} ref={showcaseRef}>
            <div className={styles.showcaseInner} ref={showcaseInnerRef}>
              <div className={styles.showcaseFrame}>
                <video
                  ref={videoRef}
                  className={styles.video}
                  src={media.hero}
                  poster={media.heroPoster}
                  width={media.width}
                  height={media.height}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label={`${identity.firstName} ${identity.lastName} speaking`}
                />

                <div className={styles.showcaseSheen} aria-hidden="true" />

                <div className={styles.controls}>
                  <div
                    className={`${styles.soundHint} ${
                      showSoundHint && isMuted ? styles.soundHintVisible : ""
                    }`}
                    aria-hidden="true"
                  >
                    <span className={styles.soundHintPulse} />
                    Tap for sound
                  </div>

                  <GlassButton
                    className={styles.control}
                    onClick={togglePlayback}
                    aria-label={playLabel}
                    title={playLabel}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </GlassButton>

                  <GlassButton
                    className={styles.control}
                    onClick={toggleSound}
                    active={!isMuted}
                    aria-label={soundLabel}
                    aria-pressed={!isMuted}
                    title={soundLabel}
                  >
                    {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
                  </GlassButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- scroll cue ---------------------------------------------- */}

        <button
          ref={cueRef}
          type="button"
          className={styles.cue}
          onClick={scrollToNext}
          aria-label="Scroll to work"
        >
          <span className={styles.cueLabel}>Scroll</span>
          <span className={styles.cueTrack} aria-hidden="true">
            <span className={styles.cuePulse} />
          </span>
          <span className={styles.cueArrow} aria-hidden="true">
            <ArrowDownIcon width={14} height={14} />
          </span>
        </button>
      </div>
    </section>
  );
}
