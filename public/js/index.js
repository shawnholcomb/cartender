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

$("#addCar").on("click", function () {
  $("#addVehicle-toggle").toggle();
})

// Functions to toggle car details open/closed

$(".vehicle-name").on("click", function () {

  var dataId = $(this).attr("id");
  $(".plus-" + dataId).toggle();
  $(".minus-" + dataId).toggle();
  $("." + dataId).toggle();
})

// Fuel type toggle function

$(".fuel-gas").on("click", function () {
  $(".fuel-gas").addClass("active");
  $(".fuel-electric").removeClass("active");
});

$(".fuel-electric").on("click", function () {
  $(".fuel-electric").addClass("active");
  $(".fuel-gas").removeClass("active");
});

$("#confirm-delete").on("click", function () {
  console.log(this);
})

// Delete functionality

$(".delete-link").on("click", deleteVehicle);

function deleteVehicle() {
  var id = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/api/delete/" + id
  })
    .then(function (dbDelete) {
      location.load();
    })
}

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