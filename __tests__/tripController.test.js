const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const { Trip } = require("../models");
const tripController = require("../controllers/trip.controller");

// Mock the models
jest.mock("../models");

const app = express();
app.use(bodyParser.json());
app.post("/trips", tripController.createTrip);
app.get("/trips", tripController.getTrips);
app.get("/trips/:id", tripController.getTrip);
app.put("/trips/:id", tripController.updateTrip);
app.delete("/trips/:id", tripController.deleteTrip);
app.patch("/trips/:id/status", tripController.updateTripStatus);

describe("Trip Controller", () => {
  it("should create a trip", async () => {
    const tripData = { name: "Test Trip", status: "ongoing" };
    Trip.create.mockResolvedValue(tripData);

    const response = await request(app).post("/trips").send(tripData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(tripData);
  });

  it("should get all trips", async () => {
    const trips = [{ id: 1, name: "Test Trip", status: "ongoing" }];
    Trip.findAll.mockResolvedValue(trips);

    const response = await request(app).get("/trips");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(trips);
  });

  it("should get a trip by ID", async () => {
    const trip = { id: 1, name: "Test Trip", status: "ongoing" };
    Trip.findByPk.mockResolvedValue(trip);

    const response = await request(app).get("/trips/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(trip);
  });

  it("should update a trip", async () => {
    const trip = {
      id: 1,
      name: "Test Trip",
      status: "ongoing",
      update: jest.fn().mockResolvedValue(true),
    };
    Trip.findByPk.mockResolvedValue(trip);

    const response = await request(app)
      .put("/trips/1")
      .send({ name: "Updated Trip" });

    expect(response.status).toBe(200);
    expect(trip.update).toHaveBeenCalledWith({ name: "Updated Trip" });
  });

  it("should delete a trip", async () => {
    const trip = {
      id: 1,
      name: "Test Trip",
      status: "ongoing",
      destroy: jest.fn().mockResolvedValue(true),
    };
    Trip.findByPk.mockResolvedValue(trip);

    const response = await request(app).delete("/trips/1");

    expect(response.status).toBe(204);
    expect(trip.destroy).toHaveBeenCalled();
  });

  it("should update trip status", async () => {
    const trip = {
      id: 1,
      name: "Test Trip",
      status: "ongoing",
      save: jest.fn().mockResolvedValue(true),
    };
    Trip.findByPk.mockResolvedValue(trip);

    const response = await request(app)
      .patch("/trips/1/status")
      .send({ status: "completed" });

    expect(response.status).toBe(200);
    expect(trip.status).toBe("completed");
    expect(trip.save).toHaveBeenCalled();
  });
});
