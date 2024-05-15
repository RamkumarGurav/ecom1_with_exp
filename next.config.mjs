/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com/**",
      },
      {
        protocol: "http",
        hostname: "localhost/**",
      },
      {
        protocol: "https",
        hostname: "icon-library.com/**",
      },
      {
        protocol: "https",
        hostname: "www.marswebsolution.com/**",
      },
    ],
  },
};

export default nextConfig;
