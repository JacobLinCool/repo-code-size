import { defineConfig } from "tsup";

export default defineConfig((options) => ({
    entry: ["src/*.ts"],
    outDir: "dist",
    target: "esnext",
    format: ["esm"],
    clean: true,
    bundle: false,
    minify: options.watch ? false : true,
    dts: false,
}));
