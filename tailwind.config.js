module.exports = {
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontSize: {
			xs: '12px',
			sm: '14px',
			base: '16px',
			lg: '20px',
			'2xl': '24px',
			'3xl': '32px',
			'4xl': '40px',
			'5xl': '44px'
		},

		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: []
}
