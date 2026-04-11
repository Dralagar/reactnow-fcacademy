import type { NextConfig } from "next";

/**
 * Pin Turbopack to this app when another package-lock.json exists higher in the
 * directory tree (e.g. under the user profile). Run `npm run dev` from this folder.
 */
const turbopackRoot = process.cwd();

const nextConfig: NextConfig = {
  turbopack: {
    root: turbopackRoot,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
