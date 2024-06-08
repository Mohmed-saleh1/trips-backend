const { Trip, Location } = require("../models");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
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
    const cacheKey = "allTrips";
    const cachedTrips = cache.get(cacheKey);
    if (cachedTrips) {
      return res.status(200).send(cachedTrips);
    }
    const trips = await Trip.findAll();
    cache.set(cacheKey, trips);
    res.status(200).send(trips);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    const cacheKey = `trip_${tripId}`;
    const cachedTrip = cache.get(cacheKey);
    if (cachedTrip) {
      return res.status(200).send(cachedTrip);
    }
    const trip = await Trip.findByPk(tripId);
    if (!trip) return res.status(404).send({ error: "Trip not found" });
    cache.set(cacheKey, trip);
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
