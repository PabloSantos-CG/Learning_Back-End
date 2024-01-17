import express from 'express';
import checklistRouter from './models/checklist';
import "../config/database";


const app = express();
app.use(express.json());

// app.use("/checklists", checklistRouter)

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
})

app.listen(3000, () => console.log("Servidor foi iniciado."));