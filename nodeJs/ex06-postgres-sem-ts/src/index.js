const express = require("express");

const planetsAndSatellitesRouter = require("./routes/planetsAndSatellites");
const captainsAndSpaceshipsRouter = require("./routes/captainsAndSpaceships");

require("../config/associations");

const app = express();

app.use(express.json());
app.use(planetsAndSatellitesRouter);
app.use(captainsAndSpaceshipsRouter);


app.listen(3000, () =>
  console.log(`A porta: 3000 está ativa. Acesse localhost:300`)
);
