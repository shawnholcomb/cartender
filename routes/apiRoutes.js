var db = require("../models");
var passport = require("passport");
LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");

// Pasport code to establish local strategy and check user login status

passport.use(new LocalStrategy(
  function (username, password, done) {
    db.user.findOne({ where: { email: username } }).then((user, err) => {
      if (err) {
        throw err;
      }
      if (!user) {
        return done(null, false, { message: 'Invalid username' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Invalid password' });
      }
      console.log('Found user!');
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  db.user.findOne({ where: { id: id } }).then((user, err) => {
    done(err, user);
  });
});

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
    db.vehicle.create({ make, model, year, registration, vin, plate, last_oil_change_date, last_oil_change_miles, tires_date, tires_miles })
      .then(function (dbvehicle) {
        res.redirect("/garage")
      })
  });

  app.post("/api/register", function (req, res) {
    var hash = bcrypt.hashSync(req.body.registerpassword, 10);
    db.user.create({
      email: req.body.registeremail,
      password: hash,
      firstname: req.body.registerfirstname,
      lastname: req.body.registerlastname
    }).then(function (dbPost) {
      res.redirect("/garage");
    })
  });

  // Passport Login Function 

  app.post('/login',
    passport.authenticate('local', {
      successRedirect: '/garage',
      failureRedirect: '/'
    })
  );

  // Profile edit feature - currently non-functional

  // app.post("/api/profile", function (req, res) {
  //   console.log(req.body);
  //   db.user.update({ 

  //   })
  //     .then(function (dbvehicle) {
  //       res.status(204).send();
  //     })
  // });

  // Delete vehicle from garage

  app.delete("/api/delete/:id", function (req, res) {
    db.vehicle.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbPost) {
        res.status(204).send();
      });
  });



};