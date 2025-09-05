import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"],
  outDir: "dist",
  target: "es2022",
  external: ["bcryptjs"], // 👈 Don't bundle bcryptjs, keep as runtime import
});
