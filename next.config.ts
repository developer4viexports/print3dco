import type { NextConfig } from "next";

// Base path the app is served under (e.g. "/3d" when hosted on a subpath).
// Single source of truth — also read by the API client (src/lib/api.ts).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
};

export default nextConfig;
