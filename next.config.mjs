/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization: allow external domains for project screenshots
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // React Compiler (Next.js 16 top-level option)
  reactCompiler: false,
};

export default nextConfig;
