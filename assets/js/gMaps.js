var origin = { lat: 28.6024372, lng: -81.2001365 };
var destination =  { lat: 28.5866662, lng: -81.3077608 }
var map;

function initMap() {
  console.log(places)
  // just a place to display messages for now.  you guys can replace it with whatever method you want that looks better
  var statusMessage = $("#statusMessage");

  // directions service returns a route based on the route options passed to it
  var directionsService = new google.maps.DirectionsService();

  // directions renderer replaces the element you pass to it with the map
  var directionsRenderer = new google.maps.DirectionsRenderer();

  // you need at least 2 sets of coordinates: origin and destination.  then you can add an array of waypoints which are optional
  // we can turn these into variables to customize the experience
  var routeOptions = {
    origin,
    destination,
    travelMode: "DRIVING",
    waypoints: [
      { location: { lat: 28.6023067, lng: -81.3195332 }, stopover: true },
    ],
    optimizeWaypoints: true,
  };

  // Generate a simple map at those coordinates with a zoom level of 17.
  // the higher the number, the closer it is
  map = new google.maps.Map(document.getElementById("map"), {
    center: origin,
    zoom: 17,
  });

  // change the output of directions renderer to replace that map we just made
  directionsRenderer.setMap(map);

  // this methoud actually does the route request and returns the results
  
  try {
    directionsService.route(routeOptions, (res, status) => {
      console.log(res);
      console.log(status);

      // if we did all of the above correctly, make a map or handle the error that was returned
      if (status == "OK") {
        directionsRenderer.setDirections(res);
      } else {
        statusMessage.text("There was an error getting your directions 😭");
      }
    });
  } catch (err) {
    console.log("Error:", err);
  }
}

 function updateMap(){
  // directions service returns a route based on the route options passed to it
  var directionsService = new google.maps.DirectionsService();

  // directions renderer replaces the element you pass to it with the map
  var directionsRenderer = new google.maps.DirectionsRenderer();

  // change the output of directions renderer to replace that map we just made
  directionsRenderer.setMap(map);

  console.log(places)
  var routeOptions = {
    origin: places[0],
    destination: places[places.length -1],
    travelMode: "DRIVING",
    waypoints: getWayPoints(places),
    optimizeWaypoints: true,
  };


  try {
    console.log('RouteOptions:',routeOptions)
    directionsService.route(routeOptions, (res, status) => {
      console.log(res);
      console.log(status);

      // if we did all of the above correctly, make a map or handle the error that was returned
      if (status == "OK") {
        directionsRenderer.setDirections(res);
      } else {
        statusMessage.text("There was an error getting your directions 😭");
      }
    });
  } catch (err) {
    console.log("Error:", err);
  }
}

function getWayPoints(places){
  return places.filter((place, i)=>{
    i !== 0 || i !== place.length - 1
  }).map(place =>{
    return {location: place, stopover: true}
  })
}