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
		extend: {
			maxWidth: {
				736: '736px'
			},
			maxHeight: {
				120: '30rem' /* 480px */
			},
			letterSpacing: {
				'1px': '1px',
				'1.5px': '1.5px'
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
