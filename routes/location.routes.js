const express = require("express");
const locationController = require("../controllers/location.controller");
const router = express.Router();

router.post("/trips/:id/locations", locationController.submitLocation);

module.exports = router;
