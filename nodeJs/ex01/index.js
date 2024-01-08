const fs = require("fs");

//Cria um arquivo com o conteúdo passado como segundo argumento
fs.writeFile("test.txt", "Hellow World", err ? console.log(err) : console.log("Tudo ocorreu bem :)"));

// //adiciona conteúdo a um arquivo já existente
fs.appendFile("tests.txt", "\nConteúdo a mais", err ? console.log(err) : console.log("Tudo ocorreu bem :)"));

// //serve para renomear um arquivo
fs.rename("tests.txt", "novoArquivo.txt", err ? console.log(err) : console.log("Tudo ocorreu bem :)"));

//procura pelo arquivo passado no caminho e exclui
fs.unlink("novoArquivo.txt", err => err ? console.log(err) : console.log("Tudo ocorreu bem :)"));

/*
const process = require("process");

//pede ao usuário um texto e exibe ele

console.log("Informe seu nome: ");

process.stdin.on("data", (keyboard) => {
  process.stdout._write(`Usuário: ${keyboard}`);
  process.exit();
})

*/