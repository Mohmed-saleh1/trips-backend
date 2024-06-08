"use strict";
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define(
    "Trip",
    {
      status: DataTypes.STRING,
    },
    {}
  );
  Trip.associate = function (models) {
    Trip.hasMany(models.Location, { foreignKey: "tripId" });
  };
  return Trip;
};
