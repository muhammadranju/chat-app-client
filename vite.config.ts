import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    allowedHosts: [
      "5104582c670d.ngrok-free.app", // ✅ allow ngrok tunnel
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    transformer: "postcss", // ⬅️ disable lightningcss
  },
  build: {
    cssMinify: "esbuild", // ⬅️ ensure esbuild handles minification
  },
});
