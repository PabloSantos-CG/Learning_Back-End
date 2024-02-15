import "dotenv/config";
import express from "express";
import router from "./routes/test";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.listen(process.env.PORT, () => console.log("\nPorta ativa!"));
