const express = require("express");
const {
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
  updateTripStatus,
} = require("../controllers/trip.controller");
const router = express.Router();

router.post("/trips/", createTrip);
router.get("/trips/", getTrips);
router.get("/trips/:id", getTrip);
router.put("/trips/:id", updateTrip);
router.delete("/trips/:id", deleteTrip);
router.patch("/trips/:id/status", updateTripStatus);

module.exports = router;
