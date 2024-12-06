/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: true,
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://make.lumnar.tech/:path*",
			},
		];
	},
	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{ key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
					{
						key: "Access-Control-Allow-Headers",
						value: "Content-Type, Authorization",
					},
				],
			},
		];
	},
};

export default nextConfig;
