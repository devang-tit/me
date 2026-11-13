// Static export: `npm run build` writes a plain HTML/CSS/JS site into ./out
// that can be hosted for free on Netlify, Vercel or GitHub Pages.
//
// GitHub Pages project sites live under /<repo-name>, so build with:
//   NEXT_PUBLIC_BASE_PATH=/<repo-name> npm run build
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
