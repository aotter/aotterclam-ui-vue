import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
import { terser } from 'rollup-plugin-terser';

import packageJson from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      format: "cjs",
      file: packageJson.main,
      sourcemap: true
    },
    {
      format: "esm",
      file: packageJson.module,
      sourcemap: true
    },
    {
      compact: true,
      format: "iife",
      file: "lib/index.min.js",
      sourcemap: true,
      name: 'aotterclamui',
      exports: 'named',
      globals: { vue: 'Vue', 'bootstrap-vue': 'bootstrapVue' },
      plugins: [terser()]
    }
  ],
  plugins: [peerDepsExternal(), resolve(), commonjs(), typescript(), vue()]
};
