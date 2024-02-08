const express = require("express");
const captainController = require("../../controllers/captainController");
const spaceshipsController = require("../../controllers/spaceshipsController");
const router = express.Router();

// captains routes
router.get("/captains", captainController.read_All_Captains);
router.post("/captains", captainController.create_Captain);

router.get("/captains/:id", captainController.read_One_Captain);
router.put("/captains/:id", captainController.update_Captain);
router.delete("/captains/:id", captainController.delete_Captain);


// spaceships routes
router.get("/spaceships", spaceshipsController.read_All_Spaceships);
router.post("/captains/:id/spaceships", spaceshipsController.create_Spaceship);

router.get("/spaceships/:id", spaceshipsController.read_One_Spaceship);
router.put("/spaceships/:id", spaceshipsController.update_Spaceship);
router.delete("/spaceships/:id", spaceshipsController.delete_Spaceship);


module.exports = router;