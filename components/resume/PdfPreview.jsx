"use client";

import { useState } from "react";
import styles from "./PdfPreview.module.css";

/**
 * On-demand PDF viewer.
 *
 * Measured on the live site: the PDF's bytes arrive in ~93ms, but an <object>
 * PDF viewer had still not fired `load` after 8 seconds — the browser has to
 * spin up its whole PDF plugin, and resource timing never shows that cost.
 * Rendering it in the initial HTML meant every visitor paid for a viewer most
 * of them never used, while the actual résumé text sat below it.
 *
 * So the viewer is mounted only on request. Download and open-in-new-tab stay
 * instant, the readable HTML summary is right below, and anyone who genuinely
 * wants the inline preview is one click away.
 */
export default function PdfPreview({ file, downloadName }) {
  const [shown, setShown] = useState(false);

  if (!shown) {
    return (
      <div className={styles.placeholder}>
        <p className={styles.hint}>PDF preview</p>
        <p className={styles.note}>
          The full résumé is written out below. Load the embedded viewer only if you
          want the formatted page.
        </p>
        <button type="button" className={styles.button} onClick={() => setShown(true)}>
          Load PDF preview
        </button>
      </div>
    );
  }

  return (
    <div className={styles.viewer}>
      <object
        className={styles.object}
        data={`${file}#view=FitH`}
        type="application/pdf"
        aria-label="Résumé PDF"
      >
        {/* Shown wherever inline PDF display is unavailable — most mobile browsers. */}
        <div className={styles.fallback}>
          <p>Your browser can&rsquo;t display the PDF inline.</p>
          <a className={styles.button} href={file} download={downloadName}>
            Download the résumé
          </a>
        </div>
      </object>
    </div>
  );
}
