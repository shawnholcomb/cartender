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

  // $("#submit").on("click", ((e) => {
  //   e.preventDefault();
  //   var addVehicleForm = {
  //     make: $("#make").val(),
  //     model: $("#model").val(),
  //     year: $("#year").val(),
  //     registration: $("#registration").val(),
  //     plate: $("#plate").val(),
  //     lastOilChange: $("#last-oil-change").val(),
  //     vin: $("#vin").val()
  //   };
  //   console.log(addVehicleForm);
   
  //   $.ajax({
  //     type: "POST",
  //     url: "/api/garage",
  //     data: addVehicleForm,
  //     dataType: "JSON",
  //     success: function (response) {
  //       console.log("added vehicle")
  //     },
  //     complete: (() => {
  //       location.reload();
  //     })
  //   });
  // }))