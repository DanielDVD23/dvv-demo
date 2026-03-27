import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  ...(isGitHubPages && {
    basePath: "/dvv-demo",
    assetPrefix: "/dvv-demo/",
  }),
};

export default nextConfig;
