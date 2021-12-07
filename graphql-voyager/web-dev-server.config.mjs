import proxy from 'koa-proxies';

export default {
  port: 8000,
  middleware: [
    proxy('/graphql/', {
      target: 'https://ama.inventage.com',
      changeOrigin: true,
      logs: true,
    }),
    proxy('/auth/', {
      target: 'https://inventagedb.inventage.com:7443',
      changeOrigin: true,
      logs: true,
    }),
  ],
};