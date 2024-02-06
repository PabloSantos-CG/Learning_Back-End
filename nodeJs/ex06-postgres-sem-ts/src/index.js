const express = require("express");

const planetsRouter = require("./routes/planets");
const satellitesRouter = require("./routes/satellites");
const captainsRouter = require("./routes/captains");
const spaceshipsRouter = require("./routes/spaceships");

// Importamos nossa associação para deixá-la disponível, ou seja, dizer que ela existe
require("../config/associations");
/*
Aplicação está com problema no relacionamento muitos-para-muitos 
*/
const app = express();
app.use(express.json());

app.use("/planets", planetsRouter);
app.use("/satellites", satellitesRouter);
app.use("/captains", captainsRouter);
app.use(spaceshipsRouter);

app.listen(3000, () =>
  console.log(`A porta: 3000 está ativa. Acesse localhost:300`)
);
