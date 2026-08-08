// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	// Static output — this is a brochure/marketing site with no server-side logic.
	output: 'static',

	vite: {
		plugins: [tailwindcss()],
	},
});
