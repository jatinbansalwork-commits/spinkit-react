import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  treeshake: true,
  minify: true,
  sourcemap: false,
  target: "es2020",
  external: ["react", "react/jsx-runtime"],
});
