import "dotenv/config";
import express from "express";
import router from "./routes/test";

const app = express();

app.use(express.json());

app.use(router);
app.listen(process.env.PORT || 3000, () => console.log("\nPorta ativa!"));