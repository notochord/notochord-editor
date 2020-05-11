import typescript from 'rollup-plugin-typescript';
import banner from 'rollup-plugin-banner';

const preamble = 'notochord-editor by Jacob Bloom\nThis software is provided as-is, yadda yadda yadda';

export default [
  {
    input: './src/ts/NotochordEditor.tsx',
    output: {
      file: './dist/NotochordEditor.js',
      format: 'esm'
    },
    external: ['react'],
    plugins: [
      typescript(),
      banner(preamble)
    ]
  },
];