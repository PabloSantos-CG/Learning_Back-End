const readline = require("readline/promises");
const fs = require("fs");

async function getUser() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const res = await rl.question("Digite algo: ");
  rl.close();

  return res;
}

async function execute(nomeDoArquivo) {
  const resultado = await getUser();

  fs.writeFile(`${nomeDoArquivo}.txt`, resultado, err => err ? console.log(err) : console.log("Usuário adicionado!"));
}

execute("usuario1");