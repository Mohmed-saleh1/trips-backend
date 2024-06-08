require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const tripRoutes = require("./routes/trip.routes");
const locationRoutes = require("./routes/location.routes");
const { sequelize } = require("./models");

const app = express();
app.use(bodyParser.json());

app.use("/", tripRoutes);
app.use("/", locationRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
