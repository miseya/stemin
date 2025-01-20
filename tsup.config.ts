import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'iife', 'cjs'],
  globalName: 'stemin',
  clean: true,
  outDir: 'dist',
  dts: true,
  minifySyntax: true,
  minifyWhitespace: true,
})
