var db = require("../models");

// Cron code - Currently non-functional

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

  app.get("/garage", isLoggedIn, function (req, res) {
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

  // Passport Log out feature
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  // Function for Passport

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }
};