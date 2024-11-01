import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"], // Build for commonJS and ESmodules
  splitting: false,
  sourcemap: true,
  noExternal: [ /(.*)/ ],
  target: "node18",
  outDir: "/Users/bryanling/Documents/Projects/internwave/code/client/desktop/apps/scrapers/waterlooworks"
});