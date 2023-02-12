/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};
