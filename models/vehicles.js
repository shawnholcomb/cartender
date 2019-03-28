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
  next_oil_change: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
  });
  return vehicle;
};
