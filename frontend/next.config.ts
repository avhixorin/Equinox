import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "snworksceo.imgix.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gizmodo.com",
        port: "",
        pathname: "/app/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.theconversation.com",
        port: "",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "gizmodo.com",
        port: "",
        pathname: "/app/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.theconversation.com",
        port: "",
        pathname: "/files/**",
      },
    ]
  }
};

export default nextConfig;
