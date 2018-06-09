// Mapbox API
var mapbox = "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHNlcmluMTgiLCJhIjoiY2poeG5oYnE3MGRwMzNwbWgydGV0dXNrNCJ9.DwxEEgXLIA54vMrZYuWuhw";

// Creating map object
var myMap = L.map("map", {
  center: [34.0522, -118.2437],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer(mapbox).addTo(myMap);

// Building API query URL
var baseURL = "https://data.lacity.org/resource/ngkp-kqkn.json?";
var naics = "NAICS=722410";

// Assembling API query URL
var url = baseURL + naics;

// Grabbing the data with d3..
d3.json(url, function(response) {
  console.log(response);
  // Creating a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through our data...
  for (var i = 0; i < response.length; i++) {
    // set the data location property to a variable
    var location = response[i].location_1;

    // If the data has a location property...
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup("Address: " + response[i].street_address + " Name: "+ response[i].business_name));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
