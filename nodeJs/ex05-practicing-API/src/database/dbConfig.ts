import express, { urlencoded } from "express";
import { connect } from "mongoose";
import path from "path";
import "dotenv/config";
import cors from "cors";

class Database {
  public express: express.Application;

  constructor() {
    this.express = express();
    this._middlewareConfig();
    this._connection();
  }

  private _middlewareConfig() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(express.static(path.join(__dirname, "../../public")));
  }

  private async _connection() {
    try {
      console.log("Conectando ao MongoDB...");
      await connect(process.env.MONGO_URL as string);
      console.log("Conectado com sucesso!");
    } catch (error) {
      console.log("Houver um erro ao conectar ao banco de dados :(\n", error);
    }
  }
}

export default new Database().express;
