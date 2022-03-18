import path from 'path'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'
// import { terser } from "rollup-plugin-terser";

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}
const name = packageOptions.filename || path.basename(packageDir)

// ensure TS checks only once for each build
let hasTSChecked = false

const outputConfigs = {
  esm: {
    file: resolve(`dist/${name}.esm.js`),
    format: 'es'
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: 'cjs'
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: 'iife'
  }
}

const defaultFormats = ['esm', 'cjs', 'global']
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')
const packageFormats = inlineFormats || packageOptions.formats || defaultFormats
const packageConfigs = packageFormats.map(format =>
  createConfig(format, outputConfigs[format])
)

export default packageConfigs

function createConfig(format, output, plugins = []) {
  const entryFile = 'src/index.ts'

  if (!output) {
    console.log(require('chalk').yellow(`incalid format: "${format}"`))
    process.exit(1)
  }

  const isGlobalBuild = /global/.test(format)

  output.exports = 'named'
  output.sourcemap = !!process.env.SOURCE_MAP
  output.externalLiveBindings = false

  if (isGlobalBuild) {
    output.name = packageOptions.name
    output.globals = packageOptions.globals
  }

  const shouldEmitDeclarations =
    pkg.types && process.env.TYPES != null && !hasTSChecked

  const tsPlugin = typescript({
    check: process.env.NODE_ENV === 'production' && !hasTSChecked,
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap,
        declaration: shouldEmitDeclarations,
        declarationMap: shouldEmitDeclarations
      },
      exclude: ['**/__tests__', 'test-dts']
    }
  })
  // we only need to check TS and generate declarations once for each build.
  // it also seems to run into weird issues when checking multiple times
  // during a single build.
  hasTSChecked = true

  let external = []

  external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]

  let cjsIgnores = []

  const nodePlugins =
    (format === 'cjs' && Object.keys(pkg.devDependencies || {}).length) ||
    packageOptions.enableNonBrowserBranches
      ? [
          require('@rollup/plugin-commonjs')({
            sourceMap: false,
            ignore: cjsIgnores
          }),
          ...(format === 'cjs'
            ? []
            : [require('rollup-plugin-polyfill-node')()]),
          require('@rollup/plugin-node-resolve').nodeResolve(),
          vue()
        ]
      : [vue()]

  return {
    input: resolve(entryFile),
    // Global and Browser ESM builds inlines everything so that they can be used alone.
    external,
    plugins: [tsPlugin, ...nodePlugins, ...plugins],
    output,
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    },
    treeshake: {
      moduleSideEffects: false
    }
  }
}
