var moment = require("moment");
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
    allowNull: true
  },
  plate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  registration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_oil_change_date: {
    type: DataTypes.DATEONLY,
    get: function() {
      return moment.utc(this.getDataValue('CreateDate')).format('DD-MM-YYYY')
    }
  },
  last_oil_change_miles: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  tires_date: {
    type: DataTypes.DATEONLY,
    get: function() {
      return moment.utc(this.getDataValue('CreateDate')).format('DD-MM-YYYY')
  }
  },
  tires_miles: {
    type: DataTypes.INTEGER,
    allowNull: true
  }

  });
  return vehicle;
};
