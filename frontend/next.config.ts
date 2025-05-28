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
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
        port: "",
        pathname: "/**",
      },{
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },{
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },{
        protocol: "https",
        hostname: "logos-world.net",
        port: "",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
