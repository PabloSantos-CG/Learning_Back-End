import express from "express";
import checklistRouter from "./routes/checklist";
import Checklist from "./models/checklist";
import "../config/database";
import "dotenv/config";

const app = express();
app.use(express.json());


// let checklist = new Checklist({ name: "Afazeres do dia" });

// checklist
//   .save()
//   .then((res) => console.log("Documento criado:", res))
//   .catch((err) => console.log("Houve um erro:", err));

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use(checklistRouter);

app.listen(process.env.PORT, () => console.log("Servidor foi iniciado."));
