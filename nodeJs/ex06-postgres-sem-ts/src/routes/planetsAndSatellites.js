const express = require("express");
const planetsController = require("../../controllers/planetsController");
const satellitesController = require("../../controllers/satellitesController");

const router = express.Router();

// planets routes
router.get("/planets", planetsController.read_All_Planets);
router.post("/planets", planetsController.create_Planet);

router.get("/planets/:id", planetsController.read_One_Planet);
router.put("/planets/:id", planetsController.update_Planet);
router.delete("/planets/:id", planetsController.delete_Planet);

// satellites routes
router.get("/satellites", satellitesController.read_All_Satellites);
router.post("/satellites", satellitesController.create_Satellite);

router.get("/satellites/:id", satellitesController.read_One_Satellite);
router.put("/satellites/:id", satellitesController.update_Satellite);
router.delete("/satellites/:id", satellitesController.delete_Satellite);

module.exports = router;