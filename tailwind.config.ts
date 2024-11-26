import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/context/**/*.{js,ts,jsx,tsx,mdx}",
	],
	important: true,
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				"primary-100": "#007BFF",
				"dark-secondary": "#6C757D",
				"light-gray": "#F0F0F0",
				tertiary: "#FD7E14",
				dark: "#4A4C4D",
			},
			fontFamily: {
				urbanist: ["Urbanist", "sans-serif"],
			},
			fontSize: {
				"2.5xl": "28px",
			},
			borderColor: {
				DEFAULT: "#E9ECEF",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
export default config;
