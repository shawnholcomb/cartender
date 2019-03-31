var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/garage", function (req, res) {
    db.vehicle.findAll({})
      .then((dbvehicle) => {
        res.json(dbvehicle);
      })
  });

  // Create a new example
  app.post("/api/garage", function (req, res) {
    var { make, model, year, registration, vin, plate, last_oil_change_date, last_oil_change_miles, tires_date, tires_miles } = req.body;
    // var errors = [];
    // ToDo error handling for form input
    db.vehicle.create({make, model, year, registration, vin, plate, last_oil_change_date, last_oil_change_miles, tires_date, tires_miles})
    .then(function (dbvehicle) {
      res.redirect("/garage")
    })
  });


  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.vehicle.destroy({ where: { id: req.params.id } }).then(function (dbvehicle) {
      res.json(dbvehicle);
    });
  });
};