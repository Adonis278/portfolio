/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /**
   * Every route in this app prerenders as static HTML, so exporting to plain
   * files lets Firebase Hosting serve the whole site from its CDN with no
   * server runtime. `next build` writes to ./out, which firebase.json serves.
   */
  output: "export",
};

export default nextConfig;
