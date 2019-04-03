require([
  "esri/widgets/Track",
  "esri/layers/FeatureLayer",
  "esri/Map",
  "esri/views/MapView",
  "esri/tasks/Locator",
  "esri/Graphic"
  
], function (Track, FeatureLayer, Map, MapView, Locator, Graphic) {


  var map = new Map({
    basemap: "streets"
  });

  var view = new MapView({
    container: "viewDiv",
    map: map
  });

  // and add it to the view's UI
  var track = new Track({
    view: view
  });
  view.ui.add(track, "top-left");

  // The sample will start tracking your location
  // once the view becomes ready
  view.when(function () {
    track.start();
  });
  var citiesRenderer = {
    type: "simple",  // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
      size: 10,
      color: "#32CD32",
      outline: {
        color: "#ffffff",
        width: "1.5px"
      }
    }
  };
  var cityRender = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/ArcGIS/rest/services/Non_Gasoline_Alternative_Fueling_Stations_2019/FeatureServer/0",
    renderer: citiesRenderer,
  });
  map.add(cityRender);




  //*** ADD ***//
  // Define a popup for Trailheads
  var stationCard = {
    "title": "Alternative Fuels",
    "content": "<b>Name:</b> {Station_Na}<br><b>Address:</b> {Street_Add}<br><b>City:</b> {City}<br><b>State:</b> {State}<br><b>Zip:<b> {Zip}</br><b>Owner Type:</b> {Owner_Type}</br><b>Fuel Type:</b> {Fuel_Type}<br><b>Phone Number:</b> {Station_Ph}</br>"
  }

  // Create the layer and set the popup
  var stationLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/ArcGIS/rest/services/Non_Gasoline_Alternative_Fueling_Stations_2019/FeatureServer/0",
    outFields: ["Station_Na", "Street_Add", "City", "State"],
    popupTemplate: stationCard
  });

  // Add the layer
  map.add(stationLayer, 0);
// search for places
  var places = ["Gas station"];

  var select = document.createElement("select","");
  places.forEach(function(p){
    var option = document.createElement("option");
    option.value = p;
    option.innerHTML = p;
    select.appendChild(option);
  });

  var locator = new Locator({
    url: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
 });

 // Find places and add them to the map
 function findPlaces(category, pt) {
  locator.addressToLocations({
    location: pt,
    categories: [category],
    maxLocations: 125,
    outFields: ["Place_addr", "PlaceName"]
  })
  .then(function(results) {
    // Clear the map
    view.popup.close();
    view.graphics.removeAll();
    // Add graphics
    results.forEach(function(result){
      view.graphics.add(
        new Graphic({
          attributes: result.attributes,
          geometry: result.location,
          symbol: {
           type: "simple-marker",
           color: "#ff0051",
           size: "15px",
           outline: {
             color: "#ffffff",
             width: "1.5px"
           }
          },
          popupTemplate: {
            title: "{PlaceName}",
            content: "{Place_addr}"
          }
       }));
    });
  });
}

// Search for places in center of map when the app loads
findPlaces(select.value, view.center);

// Listen for category changes and find places
select.addEventListener('change', function (event) {
  findPlaces(event.target.value, view.center);
});

// Listen for mouse clicks and find places
view.on("click", function(event){
  view.hitTest(event.screenPoint)
    .then(function(response){
      if (response.results.length < 2) { // If graphic is not clicked, find places
        findPlaces(select.options[select.selectedIndex].text, event.mapPoint);
      }
  })
});

  view.ui.add(select, "top-right");
});
