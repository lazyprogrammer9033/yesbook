import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML/CSS/JS to `out/`,
// which can be uploaded to any IONOS web hosting plan as-is.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // /pricing -> /pricing/index.html (works on Apache without rewrites)
  images: { unoptimized: true }, // no image server on static hosting; images are pre-optimized
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
