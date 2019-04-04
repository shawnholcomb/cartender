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
 
  function renderElectricStations() {
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
    // Define a popup
    var stationCard = {
      "title": "Alternative Fuels",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "Station_Na",
              label: "Name",
            },
            {
              fieldName: "Street_Add",
              label: "Address",
            },
            {
              fieldName: "City",
              label: "City",
            },
            {
              fieldName: "State",
              label: "State",
            },
            {
              fieldName: "Zip",
              label: "Zip Code",
            },
            {
              fieldName: "Owner_Type",
              label: "Owner Type ",
            },
            {
              fieldName: "Fuel_Type",
              label: "Fuel Type",
            },
            {
              fieldName: "Station_Ph",
              label: "Phone Number",
            },
  
          ]
        }
      ]
    }

  
    // Create the layer and set the popup
    var stationLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/ArcGIS/rest/services/Non_Gasoline_Alternative_Fueling_Stations_2019/FeatureServer/0",
      outFields: ["Station_Na", "Street_Add", "City", "State"],
      popupTemplate: stationCard
    });
  
    // Add the layer
    map.add(stationLayer, 0);
  
  
  }
   // search for places
function renderGasStations() {
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
      .then(function (results) {
        // Clear the map
        view.popup.close();
        view.graphics.removeAll();
        // Add graphics
        results.forEach(function (result) {
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

  findPlaces("Gas station", view.center);

  // Listen for mouse clicks and find places
  view.on("click", function (event) {
    view.hitTest(event.screenPoint)
      .then(function (response) {
        if (response.results.length < 2) { // If graphic is not clicked, find places
          findPlaces(select.options[select.selectedIndex].text, event.mapPoint);
        }
      })
  });
}

$(".fa-gas-pump").on("click", function() {
  $(renderGasStations()).toggle().remove(renderElectricStations());
})
$(".fuel-electric").on("click", function() {
  $(renderElectricStations()).toggle();
})


});
