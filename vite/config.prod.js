import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/LegendOfJef/",
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("../src", import.meta.url)),
		},
	},
	logLevel: "warning",
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
