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
};

export default nextConfig;
