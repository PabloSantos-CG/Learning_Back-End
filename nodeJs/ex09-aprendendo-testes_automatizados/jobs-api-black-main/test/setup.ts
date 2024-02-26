import "dotenv/config";
// aqui estamos setando nosso banco de dados para utilizar o bd test
process.env.DATABASE_URL = process.env.DATABASE_URL?.replace(/_development/, "_test");
