const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");
const colors = require('tailwindcss/colors')

module.exports = {
	darkMode: 'class',
	purge: {
		content: [
			"./src/**/*.html",
			"./src/**/*.svelte",
			"./src/**/*.svx",
			"./src/**/*.md",
		],
		options: {
			defaultExtractor: (content) => [
				// This is an internal Tailwind function that we're not supposed to be allowed to use
				// So if this stops working, please open an issue at
				// https://github.com/babichjacob/sapper-postcss-template/issues
				// rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
			],
			keyframes: true,
		},
	},
	theme: {
		extend: {
			typography(theme) {
				return {
					dark: {
						css: {
							html: { backgroundColor: theme("colors.dark-bg")},
							h1: { color: theme("colors.gray.100") },
							h2: { color: theme("colors.gray.100") },
							h3: { color: theme("colors.gray.100") },
							h4: { color: theme("colors.gray.100") },
							p: 	{ color: theme("colors.gray.100") },
							a: { color: theme("colors.gray.100") },
							strong: { color: theme("colors.gray.100") },
							"ul > li::before": { backgroundColor: theme("colors.gray.700") },
							hr: { borderColor: theme("colors.gray.800") },
							blockquote: {
								color: theme("colors.gray.100"),
								borderLeftColor: theme("colors.gray.800"),
							},
						},
					},
				};
			},
		},
		screens: {
			'min': {'max': '1023px'},
			'sm': {'min': '640px', 'max': '767px'},
			'md': {'min': '768px', 'max': '1023px'},
			'lg': {'min': '1024px', 'max': '1279px'},
			'xl': {'min': '1280px', 'max': '1535px'},
			'2xl': {'min': '1536px'},
			'lg_min':{'min': '1024px'},
		  },
		  colors:{
			  // Dark themes
			  'dark-bg': "#121212",
			  'dark-surface': "#2b2b2b",
			  'dark-primary':"#3700b3",
			  'dark-primary-var': "#bb86f4",
			  'dark-secondary': "#75f69c",
			  'information': "#082c6c",
			  // Bright themes
			  'white': colors.white,
			  'gray': colors.gray,
			  'blue': colors.blue,
			  'purple': colors.purple,
			  'yellow':colors.yellow,
		  }
	},
	variants: {
		extend: { typography: ["dark"] },
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};
