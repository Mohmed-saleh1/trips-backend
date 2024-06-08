const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const TripMock = dbMock.define("Trip", {
  id: 1,
  status: "ongoing",
});

const LocationMock = dbMock.define("Location", {
  id: 1,
  tripId: 1,
});

module.exports = {
  Trip: TripMock,
  Location: LocationMock,
};
