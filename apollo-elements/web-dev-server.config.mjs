import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import { resolveCodegenPlugin } from '@apollo-elements/create/helpers.js';
import proxy from 'koa-proxies';

import _litcss from 'rollup-plugin-lit-css';
// import rollupGrapQL from '@apollo-elements/rollup-plugin-graphql'

const litcss = fromRollup(_litcss);
// const graphQl = fromRollup(rollupGrapQL);

export default {
  nodeResolve: true,
  port: 8004,
  appIndex: 'index.html',
  rootDir: '.',
  mimeTypes: {
    'src/components/**/*.css': 'js',
    'src/style.css': 'css',
    'src/**/*.graphql': 'js'
  },
  plugins: [
    esbuildPlugin({ ts: true }),
    resolveCodegenPlugin({ ts: true }),
    litcss({
      include: 'src/components/**/*.css',
      exclude: ['src/style.css'],
    }),
    // graphQl(),
  ],
  middleware: [
    proxy('/graphql/', {
      target: 'https://api.spacex.land/',
      changeOrigin: true,
      logs: true,
    }),
  ],
};
