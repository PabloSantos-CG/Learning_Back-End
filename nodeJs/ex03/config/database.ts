import express from "express";
import mongoose from "mongoose";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.database();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.express.use(express.json());
  }

  private database() {
    mongoose
      .connect("mongodb://127.0.0.1:27017/myDbUsers")
      .then(() => console.log("conectado ao MongoDB"))
      .catch((err) => console.error(err));
  }

  private routes() {
    this.express.get("/", (req, res) => {
      return res.send("<h1>Hello World</h1>");
    });
  }
}

export default new App().express;
