module.exports = {
	mode: 'jit',
	purge: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}'
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
		extend: {
			fontFamily: {
				sans: ['Gothic A1', 'Nanum Gothic'],
				serif: ['Noto Sans KR']
			},
			typography: theme => ({
				DEFAULT: {
					css: {
						color: theme('colors.gray.800')

						// ...
					}
				}
			})
		}
	},
	variants: {
		extend: {
			display: ['hover', 'group-hover']
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
