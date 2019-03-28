// Functions to toggle Signup/Sign In modal

$("#account").on("click", function () {
  $("#signup-toggle").toggle();
  $("#signin-toggle").toggle();
});

$("#signup").on("click", function () {
  $("#signup-toggle").toggle();
  $("#signin-toggle").toggle();
});

// Function to toggle add car modal
$("#addCar").on("click", function() {
  $("#addVehicle-toggle").toggle();
})

