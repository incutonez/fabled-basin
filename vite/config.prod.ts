import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/legend-of-one-f/",
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("../src", import.meta.url)),
		},
	},
	logLevel: "warn",
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					phaser: ["phaser"],
				},
			},
		},
		minify: "terser",
		terserOptions: {
			compress: {
				passes: 2,
			},
			mangle: true,
			format: {
				comments: false,
			},
		},
	},
});
