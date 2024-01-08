const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/user", (req, res) => {
  res.json({ name: "Pablo", password: 123456 });
})

app.listen(3000, () => console.log("Servidor iniciado..."));