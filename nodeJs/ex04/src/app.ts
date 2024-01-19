import express from "express";
import path from "path";
import checklistRouter from "./routes/checklist";
import rootRouter from "./routes/index";
import "../config/database";
import "dotenv/config";

// configurando express para usar seus recursos e para entender arquivos json //
const app = express();
app.use(express.json());
// habilita o express a pegar informações por url de form //
app.use(express.urlencoded({ extended: true }));

// habilitar a aplicação a usar arquivos estáticos //
app.use(express.static(path.join(__dirname, "../public")));

// configuração para usar view enginer //
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Usando as rotas pré-definidas //
app.use("/", rootRouter);
app.use("/checklists", checklistRouter);

// porta de acesso da aplicação //
app.listen(process.env.PORT, () => console.log("( Servidor foi iniciado )"));
