/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Assuming react plugin is needed if not already present or used by rollup

// Since the project uses rollup, we might not have vite installed as a plugin runner,
// but vitest uses vite config. We'll use a basic config.
export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/setupTests.ts',
		css: false,
	},
});
