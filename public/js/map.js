require([
  "esri/widgets/Track",
  "esri/layers/FeatureLayer",
  "esri/Map",
  "esri/views/MapView"
], function (Track, FeatureLayer, Map, MapView) {


  var map = new Map({
    basemap: "streets-navigation-vector"
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
      size: 8,
      color: "grey"
    }
  };
  var cityRender = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/ArcGIS/rest/services/Non_Gasoline_Alternative_Fueling_Stations_2019/FeatureServer/0",
    renderer: citiesRenderer,
  });
  map.add(cityRender);

  var renderer = {
    type: "unique-value",  // autocasts as new UniqueValueRenderer()
    field: "Fuel_Type",
    defaultSymbol: { 
      type: "simple-fill",
      "color": "green" 
    },  // autocasts as new SimpleFillSymbol()
    uniqueValueInfos: [{
      // All features with value of "North" will be blue
      value: "ELEC",
      symbol: {
        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
        color: "blue"
      }
    }, {
      // All features with value of "East" will be green
      value: "CNG",
      symbol: {
        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
        color: "yellow"
      }
    }, {
      // All features with value of "South" will be red
      value: "LPG",
      symbol: {
        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
        color: "orange"
      }
    }, {
      // All features with value of "West" will be yellow
      value: "BD",
      symbol: {
        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
        color: "pink"
      }
    }]
  };


  var markerLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/ArcGIS/rest/services/Non_Gasoline_Alternative_Fueling_Stations_2019/FeatureServer/0",
    renderer: renderer,
  });

  map.add(markerLayer, 1);

  //*** ADD ***//
  // Define a popup for Trailheads
  var stationCard = {
    "title": "Alternative Fuels",
    "content": "<b>Name:</b> {Station_Na}<br><b>Address:</b> {Street_Add}<br><b>City:</b> {City}<br><b>State:</b> {State}<br><b>Zip:<b> {Zip}</br><b>Owner Type:</b> {Owner_Type}</br><b>Fuel Type:</b> {Fuel_Type}<br><b>Phone Number:</b> {Station_Ph}</br>"
  }

  // Create the layer and set the popup
  var stationLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/ArcGIS/rest/services/Non_Gasoline_Alternative_Fueling_Stations_2019/FeatureServer/0",
    outFields: ["Station_Na", "Street_Add", "City", "State", "Zip, Owner_Type, Fuel_Type, Station_Ph"],
    popupTemplate: stationCard
  });

  // Add the layer
  map.add(stationLayer, 2);
});