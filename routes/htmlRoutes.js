var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("home", {
      title: "Cartender - Maintenance Reminders made Easy"
    })
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.vehicles.findOne({ where: { id: req.params.id } }).then(function (dbVehicles) {
      res.render("example", {
        example: dbVehicles
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
