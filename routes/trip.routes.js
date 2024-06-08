const express = require("express");
const tripController = require("../controllers/trip.controller");
const router = express.Router();

router.post("/trips", tripController.createTrip);
router.get("/trips", tripController.getTrips);
router.get("/trips/:id", tripController.getTrip);
router.put("/trips/:id", tripController.updateTrip);
router.delete("/trips/:id", tripController.deleteTrip);
router.patch("/trips/:id/status", tripController.updateTripStatus);

module.exports = router;
