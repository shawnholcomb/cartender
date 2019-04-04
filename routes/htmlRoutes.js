var db = require("../models");
// var cron = require('node-cron');
 
// cron.schedule('0 1 * * *', () => {
//   console.log('Runing a job at 01:00 at America/Sao_Paulo timezone');
// }, {
//   scheduled: true,
//   timezone: "America/Sao_Paulo"
// });

// cron.schedule('1 * * * * * * *', () => {
//   console.log('running every minute 1, 2, 4 and 5');
// });
module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("home", { title: "Cartender - Maintenance Reminders made Easy" })
  });

  // app.post("/register", function(req, res) {
  //   console.log(req.body);
  // });

  app.get("/garage", function (req, res) {
    db.vehicle.findAll({}).then((dbvehicle) => {

      res.render("garage", { title: "Cartender - My Garage", dbvehicle });
    })
  })

  app.get("/map", function (req, res) {
    res.render("map", { title: "Cartender- My Map" })
  })

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.vehicle.findOne({ where: { id: req.params.id } }).then(function (dbvehicle) {
      res.render("example", {
        example: dbvehicle
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};