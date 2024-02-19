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
    typedRoutes: true,
  },
  env: {
    BASEURL: process.env.BASEURL,
    HOMEURL: process.env.HOMEURL,
    SELLERURL: process.env.SELLERURL,
    PRODUCTIMAGEURL: process.env.PRODUCTIMAGEURL,
  },
  images: {
<<<<<<< HEAD
    domains: ['localhost', 'https://ngmp-products.s3.us-east-005.backblazeb2.com', 'https://admin.nilegmp.com', '192.168.1.21'], // Add the IP address to the list of allowed domains
=======
    domains: ['localhost', 'https://ngmp-products.s3.us-east-005.backblazeb2.com', 'https://admin.nilegmp.com', '192.168.1.6'], // Add the IP address to the list of allowed domains
>>>>>>> 49e569702b3e1264631b9f56cdef96a4fe729f2e
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",

        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ngmp-products.s3.us-east-005.backblazeb2.com",
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
        hostname: "admin.nilegmp.com",
        port: "",
        pathname: "/**",
      },
      // Add a new pattern for the new IP address
      {
        protocol: "https",
<<<<<<< HEAD
        hostname: "192.168.1.21", // Replace with the actual hostname or IP address
=======
        hostname: "192.168.1.6", // Replace with the actual hostname or IP address
>>>>>>> 49e569702b3e1264631b9f56cdef96a4fe729f2e
        port: "", // If there is a specific port, add it here
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
