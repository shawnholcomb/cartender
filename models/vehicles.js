module.exports = function(sequelize, DataTypes) {
  var vehicle = sequelize.define("vehicle", {
    make: {
      type: DataTypes.STRING,
      allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  vin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  registration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_oil_change: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  last_oil_change_miles: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  tires_date: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  tires_miles: {
    type: DataTypes.INTEGER,
    allowNull: true
  }

  });
  return vehicle;
};
