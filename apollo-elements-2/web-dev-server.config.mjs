import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import { resolveCodegenPlugin } from '@apollo-elements/create/helpers.js';

// import rollupCommonJs from '@rollup/plugin-commonjs';
import rollupLitCss from 'rollup-plugin-lit-css';
import rollupGrapQL from '@apollo-elements/rollup-plugin-graphql'

const litCss = fromRollup(rollupLitCss);
const graphQl = fromRollup(rollupGrapQL);
// const commonJs = fromRollup(rollupCommonJs);

const componentCss = 'src/components/**/*.css';
// const globalCss = 'src/style.css';

export default {
  nodeResolve: true,
  watch: true,
  port: 8004,
  appIndex: 'index.html',
  rootDir: '.',
  mimeTypes: {
    'src/components/**/*.css': 'js',
    // 'src/style.css': 'css',
    'src/**/*.graphql': 'js',
    'src/**/*.ts': 'js',
  },
  plugins: [
    esbuildPlugin({ ts: true }),
    //resolveCodegenPlugin({ ts: true }),
    litCss({
      include: componentCss,
      // exclude: globalCss,
    }),
    graphQl(),
    // commonJs(),
  ],
};
