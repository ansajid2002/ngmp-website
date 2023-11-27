/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {

    // appDir: true,
    typedRoutes: true,
  },
  env: {
    BASEURL: process.env.BASEURL,
    HOMEURL: process.env.HOMEURL,
    HOSTNAME_IMAGES: process.env.HOSTNAME_IMAGES
  },
  images: {
<<<<<<< HEAD
    domains: ['localhost', 'https://nileadmin.websitetest.info', 'admin.nilegmp.com', '192.168.1.5'], // Add the IP address to the list of allowed domains
=======
    domains: ['localhost', 'https://admin.nilegmp.com', 'https://nileadmin.websitetest.info', '192.168.1.5'], // Add the IP address to the list of allowed domains
>>>>>>> 51d4da2c7f97c55adbb2c450dbfa9955800af22f
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placekitten.com",
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

      // Add a new pattern for the new IP address
      {
        protocol: "https",
<<<<<<< HEAD
        hostname: process.env.HOSTNAME_IMAGES, // Replace with the actual hostname or IP address
=======
        hostname: "192.168.1.5", // Replace with the actual hostname or IP address
>>>>>>> 51d4da2c7f97c55adbb2c450dbfa9955800af22f
        port: "", // If there is a specific port, add it here
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
