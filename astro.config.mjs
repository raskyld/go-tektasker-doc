import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: "https://go-tektasker.nocera.eu",
	integrations: [
		starlight({
			title: 'go-tektasker',
			logo: {
				src: './src/assets/go-tektasker.svg'
			},
			social: {
				github: 'https://github.com/raskyld/go-tektasker',
			},
			favicon: '/favicon.svg',
			sidebar: [
				{
					label: 'General',
					autogenerate: { directory: 'general' },
				},
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'References',
					autogenerate: { directory: 'references' },
				}
			],
		}),
	],
});
