import database from "./database/dbConfig";
import { ping, rand, createPhrase } from "./controllers/apiController";

database.get("/", ping);
database.get("/rand", rand);
database.post("/", createPhrase);

database.use((req, res) => {
  res.status(404).json({ error: "Sorry, endpoint not found" });
});

database.listen(process.env.PORT);
