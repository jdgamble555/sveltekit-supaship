import { sveltekit } from '@sveltejs/kit/vite';

import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
			'@components': resolve('src/components'),
			'@styles': resolve('src/styles')
		}
	}
};

export default config;
