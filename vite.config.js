import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import WindiCSS from "vite-plugin-windicss";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // 选项写法
      "/api": {
        target: "https://sss.yewanba.com/quwancopy/admin",
        // target: "https://sss.yewanba.com/quwan/admin",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        cors: true,
      },
    },
  },
  resolve: { alias: { "~": path.resolve(__dirname, "src") } },
  base: "./",
  plugins: [
    WindiCSS(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
