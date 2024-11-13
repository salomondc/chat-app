/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://make.lumnar.tech/:path*", // Proxy to Backend
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/chat",
				destination: "/chat/1",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
