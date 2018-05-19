const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

var counter = 0;

const server = http.createServer((req, res) => {
  console.log('-----------')
  if(url.parse(req.url).pathname==='/favicon.ico') return
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end((counter++).toString());
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});