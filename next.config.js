/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true,
    typedRoutes: true,
  },
  images: {
    domains: ['localhost', 'https://admin.nilegmp.com', 'https://nileadmin.websitetest.info', '192.168.1.9', 'http://192.168.1.9:3001'], // Add the IP address to the list of allowed domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nileadmin.websitetest.info",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "admin.nilegmp.com",
        port: "",
        pathname: "/**",
      },
      // Add a new pattern for the new IP address
      {
        protocol: "https",
        hostname: "192.168.1.9", // Replace with the actual hostname or IP address
        port: "", // If there is a specific port, add it here
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
