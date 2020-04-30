import typescript from 'rollup-plugin-typescript';
import banner from 'rollup-plugin-banner';
import alias from 'rollup-plugin-alias';

const preamble = 'notochord-editor by Jacob Bloom\nThis software is provided as-is, yadda yadda yadda';

export default [
  {
    input: './src/NotochordEditor.tsx',
    output: {
      file: './dist/NotochordEditor.mjs',
      format: 'esm'
    },
    external: ['https://dev.jspm.io/tonal@2.2.2'],
    plugins: [
      alias({ tonal: 'https://dev.jspm.io/tonal@2.2.2' }),
      typescript(),
      banner(preamble)
    ]
  },
];