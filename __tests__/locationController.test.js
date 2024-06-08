const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const { Trip, Location } = require("../models");
const locationController = require("../controllers/location.controller");

// Mock the models
jest.mock("../models");

const app = express();
app.use(bodyParser.json());
app.post("/trips/:id/locations", locationController.submitLocation);

describe("Location Controller", () => {
  it("should submit a location", async () => {
    const trip = { id: 1, status: "ongoing" };
    Trip.findByPk.mockResolvedValue(trip);
    const locationData = {
      latitude: 123.456,
      longitude: 789.101,
      tripId: trip.id,
    };
    Location.create.mockResolvedValue(locationData);

    const response = await request(app)
      .post("/trips/1/locations")
      .send(locationData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(locationData);
  });

  it("should not submit location if trip not found", async () => {
    Trip.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .post("/trips/1/locations")
      .send({ latitude: 123.456, longitude: 789.101 });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Trip not found");
  });

  it("should not submit location if trip is not ongoing", async () => {
    const trip = { id: 1, status: "completed" };
    Trip.findByPk.mockResolvedValue(trip);

    const response = await request(app)
      .post("/trips/1/locations")
      .send({ latitude: 123.456, longitude: 789.101 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Trip is not ongoing");
  });
});
