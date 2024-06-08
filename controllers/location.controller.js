const { Trip, Location } = require("../models");

exports.submitLocation = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).send({ error: "Trip not found" });
    if (trip.status !== "ongoing") {
      return res.status(400).send({ error: "Trip is not ongoing" });
    }
    const location = await Location.create({ ...req.body, tripId: trip.id });
    res.status(201).send(location);
  } catch (error) {
    res.status(400).send(error);
  }
};
