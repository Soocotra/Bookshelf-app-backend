/* eslint-disable linebreak-style */
const hapi = require('@hapi/hapi');
const routes = require('./route');

const init = async () => {
  const server = hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server sedang berjalan dengan alamat ${server.info.uri}`);
};

init();
