import buble from '@rollup/plugin-buble'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
import dts from "rollup-plugin-dts";
// import pkg from './package.json'

// const banner = `/*!
//  * vuex v${pkg.version}
//  * (c) ${new Date().getFullYear()} masongzhi
//  * @license MIT
//  */`

const configs = [
  { input: 'src/index.ts', file: 'dist/vue-countdown.esm.js', format: 'es', browser: true, env: 'development' },
  { input: 'src/index.ts', file: 'dist/vue-countdown.esm.prod.js', format: 'es', browser: true, env: 'production', minify: true },
  { input: 'src/index.ts', file: 'dist/vue-countdown.cjs.js', format: 'cjs', env: 'development' },
  { input: 'src/index.ts', file: 'dist/vue-countdown.global.prod.js', format: 'iife', minify: true, env: 'production' },
  { input: 'src/index.ts', file: 'types/vue-countdown.d.ts', format: 'es',  env: 'development', dts: true },
]

function createEntries() {
  return configs.map((c) => createEntry(c))
}

function createEntry(config) {
  const isGlobalBuild = config.format === 'iife'
  const isBundlerBuild = config.format !== 'iife' && !config.browser
  const isBundlerESMBuild = config.format === 'es' && !config.browser

  const c = {
    input: config.input,
    plugins: [],
    external: ["vue"],
    output: {
      // banner,
      file: config.file,
      format: config.format,
      globals: {
        vue: 'Vue'
      }
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }

  if (isGlobalBuild) {
    c.output['name'] = c.output['name'] || 'VueCountdownHook'
  }

  c.plugins.push(replace({
    preventAssignment: true,
    // __VERSION__: pkg.version,
    __DEV__: isBundlerBuild
      ? `(process.env.NODE_ENV !== 'production')`
      : config.env !== 'production',
  }))

  if (config.transpile !== false) {
    c.plugins.push(buble())
  }

  c.plugins.push(resolve())
  c.plugins.push(commonjs())
  c.plugins.push(typescript())

  if (config.dts === true) {
    c.plugins.push(dts())
  }

  if (config.minify) {
    c.plugins.push(terser({ module: config.format === 'es' }))
  }

  return c
}

export default createEntries()
