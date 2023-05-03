/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		fontFamily: {
			inter: ['Inter', 'sans-serif']
		},
		fontSize: {
			'2xs': ['0.5rem', '0.625rem'],
			'1.5xs': ['0.625rem', '0.875rem'],
			xs: ['0.75rem', '0.875rem'],
			sm: ['0.875rem', '1rem'],
			base: ['1rem', '1.125rem'],
			lg: ['1.125rem', '1.25rem'],
			'2xl': ['1.5rem', '1.75rem'],
			'3xl': ['2.25rem', '2.5rem'],
			'4xl': ['3rem', '3.5rem']
		}
	},
	plugins: []
}
