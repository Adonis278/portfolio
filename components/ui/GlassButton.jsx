"use client";

import { forwardRef } from "react";
import styles from "./GlassButton.module.css";

/**
 * Frosted control used for every hero affordance.
 *
 * @param {object} props
 * @param {'icon'|'pill'} [props.variant]
 * @param {boolean} [props.active] Renders the warm "live" accent state.
 */
const GlassButton = forwardRef(function GlassButton(
  { variant = "icon", active = false, className, children, ...rest },
  ref
) {
  const classes = [
    styles.button,
    styles[variant],
    active ? styles.active : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button ref={ref} type="button" className={classes} {...rest}>
      <span className={styles.sheen} aria-hidden="true" />
      <span className={styles.content}>{children}</span>
    </button>
  );
});

export default GlassButton;
