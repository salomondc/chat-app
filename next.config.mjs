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
};

export default nextConfig;
