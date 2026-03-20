/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["better-sqlite3"],
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

  // Serve Unity Gzip-compressed build files with correct headers
  async headers() {
    return [
      {
        source: "/games/ascension/Build/:path*.js.gz",
        headers: [
          { key: "Content-Encoding", value: "gzip" },
          { key: "Content-Type", value: "application/javascript" },
        ],
      },
      {
        source: "/games/ascension/Build/:path*.wasm.gz",
        headers: [
          { key: "Content-Encoding", value: "gzip" },
          { key: "Content-Type", value: "application/wasm" },
        ],
      },
      {
        source: "/games/ascension/Build/:path*.data.gz",
        headers: [
          { key: "Content-Encoding", value: "gzip" },
          { key: "Content-Type", value: "application/octet-stream" },
        ],
      },
    ];
  },

  // React Compiler (Next.js 16 top-level option)
  reactCompiler: false,
};

export default nextConfig;
