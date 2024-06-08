const request = require("supertest");
const app = require("../server"); // assuming your express app is exported from server.js

describe("Trip API", () => {
  it("should create a new trip", async () => {
    const res = await request(app).post("/trips").send({ status: "ongoing" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("status", "ongoing");
  });

  // more tests
});
