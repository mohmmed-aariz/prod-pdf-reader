/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "256mb"
    }
  },
  webpack: (config) => {
		config.resolve.alias.canvas = false;
		return config;
	},
};

export default nextConfig;
