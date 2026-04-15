// @ts-check
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

if (!process.env.SKIP_ENV_VALIDATION) {
  await import("./src/env.mjs");
  await import("./src/lib/auth/env.mjs");
}

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "www.twillot.com" },
      { protocol: "https", hostname: "cdnv2.ruguoapp.com" },
      { protocol: "https", hostname: "www.setupyourpay.com" },
    ],
  },
  /** We already do linting and typechecking as separate tasks in CI */
  typescript: { ignoreBuildErrors: true },
  output: "standalone",
  async headers() {
    return [
      {
        source: "/llms.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=43200" },
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
        ],
      },
      {
        source: "/llms-full.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=43200" },
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
        ],
      },
      {
        source: "/:path*.jpg",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, immutable" },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      /Parsing of.*for build dependencies failed at 'import\(t\)'/,
    ];
    return config;
  },
};

// Compose plugins
export default withNextIntl(config);
