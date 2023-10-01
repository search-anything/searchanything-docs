import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Search Anything Docs',
			social: {
				github: 'https://github.com/search-anything/searchanything-docs',
			},
			sidebar: [
				{
					label: 'Setup',
					autogenerate: {directory: 'guides'}
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
