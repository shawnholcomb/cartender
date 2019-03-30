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
    var { make, model, year, registration, vin, plate, lastOilChange } = req.body;
    // var errors = [];
    // ToDo error handling for form input
    db.vehicle.create({make, model, year, registration, vin, plate, lastOilChange})
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


//These are the handlebars vars to insert into garage page
// {{make}}
// {{model}}  
// {{year}}
// {{registration}}
// {{vin}}
// {{plate}}
// {{lastOilChange}}