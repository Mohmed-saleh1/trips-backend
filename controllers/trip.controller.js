const { Trip, Location } = require("../models");

exports.createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).send(trip);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.status(200).send(trips);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).send({ error: "Trip not found" });
    res.status(200).send(trip);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).send({ error: "Trip not found" });
    await trip.update(req.body);
    res.status(200).send(trip);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).send({ error: "Trip not found" });
    await trip.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateTripStatus = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip) return res.status(404).send({ error: "Trip not found" });
    if (trip.status === "completed" && req.body.status === "ongoing") {
      return res
        .status(400)
        .send({ error: "Cannot change status from completed to ongoing" });
    }
    trip.status = req.body.status;
    await trip.save();
    res.status(200).send(trip);
  } catch (error) {
    res.status(400).send(error);
  }
};
