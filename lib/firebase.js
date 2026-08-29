import { getApp, getApps, initializeApp } from "firebase/app";

/**
 * Firebase web configuration.
 *
 * These values are not secrets — the web SDK ships them to every visitor in
 * the client bundle by design, and Firebase documents them as public
 * identifiers. Access is controlled by Security Rules and App Check, not by
 * hiding this object. They are inlined rather than read from env vars so the
 * static export can never build without them.
 */
const firebaseConfig = {
  apiKey: "AIzaSyCMH1Wle0bT_wfmZWp3ZUQZ71JZ3MEcNmk",
  authDomain: "jeromeadoniszw.firebaseapp.com",
  projectId: "jeromeadoniszw",
  storageBucket: "jeromeadoniszw.firebasestorage.app",
  messagingSenderId: "1034590900992",
  appId: "1:1034590900992:web:eb4d6f86708668f63519e5",
  measurementId: "G-CWV8LBVW2B",
};

/**
 * The initialised Firebase app.
 *
 * Guarded with getApps() because React Strict Mode and Fast Refresh both
 * re-run module consumers, and initializeApp throws on a duplicate name.
 */
export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export { firebaseConfig };
