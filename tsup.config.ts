import { defineConfig } from "tsup";

export default defineConfig((options) => ({
    entry: ["src/*.ts"],
    outDir: "dist",
    target: "esnext",
    format: ["esm"],
    clean: true,
    bundle: true,
    minify: false,
    dts: false,
    splitting: false,
}));
