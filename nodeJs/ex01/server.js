const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end("<h1>Hello World!</h1>");
});

server.listen(3000, () => {
  console.log("Servidor ativo...");
});