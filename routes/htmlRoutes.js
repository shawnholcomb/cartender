var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.vehicles.findAll({}).then(function(dbVehicles) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbVehicles
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.vehicles.findOne({ where: { id: req.params.id } }).then(function(dbVehicles) {
      res.render("example", {
        example: dbVehicles
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
