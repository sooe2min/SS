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
				sans: ['Gothic A1', 'Nanum Gothic', 'Noto Sans KR']
			},
			backgroundColor: {
				f5f5fa: '#f5f5fa'
			},
			textColor: {
				'preview-500': '#9698c3',
				'preview-600': '#777aaf',
				'preview-700': '#5a5e9a',
				'preview-800': '#484c7a'
			}
		}
	},
	variants: {
		extend: {
			display: ['hover', 'group-hover']
		}
	},
	plugins: []
}
