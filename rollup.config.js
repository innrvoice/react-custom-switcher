import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json' assert { type: 'json' };

export default {
  input: './src/index.ts',

  output: [
    {
      format: 'es',
      file: pkg.module,
      globals: {
        react: 'React',
      },
    },
    {
      format: 'umd',
      file: pkg.main,
      name: pkg.name,
      globals: {
        react: 'React',
      },
    },
  ],

  plugins: [
    resolve(),
    commonJS(),
    typescript({
      tsconfigOverride: {
        exclude: ['**/*.test.ts', '**/*.stories.tsx'],
      },
    }),
    terser(),
  ],
  external: ['react'],
};
