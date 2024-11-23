/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return process.env.NODE_ENV === "development"
			? [
					{
						source: "/api/:path*",
						destination: "https://make.lumnar.tech/:path*",
					},
			  ]
			: [];
	},
};

export default nextConfig;
