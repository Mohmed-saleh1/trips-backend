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
    // associations can be defined here
    Trip.hasMany(models.Location, { foreignKey: "tripId" });
  };
  return Trip;
};
