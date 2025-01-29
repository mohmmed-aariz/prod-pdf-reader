/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "256mb"
    },
    serverComponentsHmrCache: false
  },
  webpack: (config) => {
		config.resolve.alias.canvas = false;
		return config;
	},
  images: {
    // domains: ['utfs.io']
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '**'
      }
    ]
  },

};

export default nextConfig;
