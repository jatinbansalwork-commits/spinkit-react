import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  appType: "spa",
  resolve: {
    alias: [
      {
        find: /^spinkit-react\/sound$/,
        replacement: fileURLToPath(new URL("../src/sound.ts", import.meta.url)),
      },
      {
        find: /^spinkit-react$/,
        replacement: fileURLToPath(new URL("../src/index.ts", import.meta.url)),
      },
    ],
  },
  server: {
    port: 5173,
  },
});
