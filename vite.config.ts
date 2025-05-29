import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import UnoCSS from "unocss/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vite.dev/config/
const ROOT_PATH = process.cwd();
console.log(ROOT_PATH);

export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(ROOT_PATH, "src/assets/svg")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import '@/styles/variables.less';`,
      },
    },
  },
});
