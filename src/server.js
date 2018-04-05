const http = require('http');
const handler = require('./handler');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;

const server = http.createServer(handler);

server.listen(port, () => {
  console.log(`Server running on : http://${host}:${port}`);
});