const express = require("express");

const teacherRouter = require("./routes/teachersRouter");

const app = express();
app.use(express.json());
app.use("/projeto-escolar", teacherRouter);

app.listen(3000, () =>
  console.log(`A porta: 3000 está ativa. Acesse localhost:3000`)
);