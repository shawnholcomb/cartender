// Initialize the platform object:
var platform = new H.service.Platform({
    'app_id': '6yFbpJ8TwoZAlzj4jLAt',
    'app_code': 'tr3VSbRXt94KCbBZBLQokQ'
    });

    var defaultLayers = platform.createDefaultLayers();

  // Instantiate the map:
  var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.normal.map,
    {
      zoom: 10,
      center: { lng: 13.4, lat: 52.51 }
    });

  // Create the default UI:
  var ui = H.ui.UI.createDefault(map, defaultLayers);