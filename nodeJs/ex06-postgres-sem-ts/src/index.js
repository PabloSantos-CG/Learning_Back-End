const express = require("express");
const routes = require("./routes");
// Importamos nossa associação para deixá-la disponível, ou seja, dizer que ela existe
require("../config/associations");

const app = express();

app.use(express.json());
app.use("/planets", routes);
app.listen(3000, () => console.log(`A porta: 3000 está ativa. Acesse localhost:300`));