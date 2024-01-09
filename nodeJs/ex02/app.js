const express = require("express");
const welcome = require("./router/welcome");
const rotaDinamica = require("./router/rotaDinamica");

const app = express();

//permite verificar se existe alguma resposta json no body da requisição
app.use(express.json());

//criamos uma rota em outro arquivo e usamos ele como se fosse um middleware
//passamos o /welcome (o caminho) aqui, pois assim 
app.use("/welcome", welcome);

//rota dinâmica
app.use(rotaDinamica);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/user", (req, res) => {
  res.json({ name: "Pablo", password: 123456 });
});

app.listen(3000, () => console.log("Servidor iniciado..."));
