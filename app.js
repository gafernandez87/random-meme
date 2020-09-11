const http = require('http');
const express = require('express');
const routes = require('./routes/index');

const app = express();
app.use('/', routes);

const server = http.createServer(app);
const port = process.env.PORT || 4001;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
