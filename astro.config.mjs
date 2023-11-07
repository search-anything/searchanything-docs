import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: "https://search-anything.github.io",
	base: "/searchanything-docs",
	integrations: [
		starlight({
			title: 'Search Anything Docs',
			social: {
				github: 'https://github.com/search-anything/searchanything-docs',
			},
			sidebar: [
				{
					label: 'Guides',
					autogenerate: {directory: 'guides'}
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'api' },
				},
			],
		}),
	],
});
