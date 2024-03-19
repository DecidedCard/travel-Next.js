/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nextui-docs-v2.vercel.app",
        pathname: "/**/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**/**",
      },
    ],
  },
};

export default nextConfig;
