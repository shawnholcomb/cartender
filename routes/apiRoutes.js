var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/garage", function(req, res) {
    db.vehicle.findAll({}).then(function(dbvehicle) {
      res.json(dbvehicle);
    });
  });

  // Create a new example
  app.post("/api/garage", function(req, res) {
    db.vehicle.create(req.body).then(function(dbvehicle) {
      res.json(dbvehicle);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.vehicle.destroy({ where: { id: req.params.id } }).then(function(dbvehicle) {
      res.json(dbvehicle);
    });
  });
};
