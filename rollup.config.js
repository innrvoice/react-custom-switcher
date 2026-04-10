import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import nodeExternals from 'rollup-plugin-node-externals';
import terser from '@rollup/plugin-terser';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

export default {
  input: './src/index.ts',

  output: [
    {
      format: 'es',
      file: pkg.module,
      sourcemap: true,
      globals: {
        react: 'React',
      },
    },
    {
      format: 'umd',
      file: pkg.main,
      name: pkg.name,
      sourcemap: true,
      globals: {
        react: 'React',
      },
    },
  ],

  plugins: [
    nodeExternals(),
    resolve(),
    commonJS(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/*.test.ts', '**/*.stories.tsx'],
    }),
    terser(),
  ],
  external: ['react'],
};
