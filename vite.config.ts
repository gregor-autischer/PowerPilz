import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: "src/power-pilz.ts",
      formats: ["es"],
      fileName: () => "power-pilz.js"
    },
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name][extname]"
      }
    }
  }
});
