import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: "https://search-anything.github.io",
	base: "/searchanything-docs",
	integrations: [
		starlight({
			favicon: './favicon.ico',
			logo: {
				src: './src/assets/logo.png',
			},
			title: 'Search Anything',
			customCss: ['./src/custom-styles.css'],
			sidebar: [
				{
					label: 'Guides',
					autogenerate: {directory: 'guides'}
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'api' },
				},
				{ label: 'Sign up', badge: '>', link: 'https://searchanything-landing.vercel.app/' },
				{ label: 'Your dashboard', badge: '>', link: 'https://searchanything.vercel.app/' },
			],
		}),
	],
});
