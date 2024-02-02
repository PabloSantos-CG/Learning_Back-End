const express = require("express");
const planetsController = require("../../controllers/planetsController");

const routes = express.Router();

routes.post("/", planetsController.create_Planet);
routes.get("/", planetsController.read_All_Planets);

routes.get("/:id", planetsController.read_One_Planet);
routes.put("/:id", planetsController.update_Planet);
routes.delete("/:id", planetsController.delete_Planet);

module.exports = routes;