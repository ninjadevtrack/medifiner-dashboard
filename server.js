/* eslint-disable */
const enforce = require('express-sslify');
const express = require('express');
const compression = require('compression');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT ? process.env.PORT : 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    if (!dev) {
      server.use(enforce.HTTPS({ trustProtoHeader: true }));
      server.use(compression());
    }

    server.use(express.static('static'))

    server.get('/account-setup/:token', (req, res) => {
      const actualPage = '/account-setup';
      const queryParams = { token: req.params.token };

      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, '0.0.0.0', (err) => {
      if (err) throw err;
      if (dev) {
        console.log('> Ready on http://localhost:' + port);
      }
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
