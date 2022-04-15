var origin = { lat: 28.6024372, lng: -81.2001365 };
var destination = { lat: 28.5866662, lng: -81.3077608 }
var map;

function initMap() {
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

async function updateMap() {
  // directions service returns a route based on the route options passed to it
  var directionsService = new google.maps.DirectionsService();

  // directions renderer replaces the element you pass to it with the map
  var directionsRenderer = new google.maps.DirectionsRenderer();

  // change the output of directions renderer to replace that map we just made
  directionsRenderer.setMap(map);


  // this object contains options for google maps route method
  // origin and destination will be first and last index of places array respectively
  // waypoints will need some extra keys which is handled by getWayPoints function
  var routeOptions = {
    origin: places[0],
    destination: places[places.length - 1],
    travelMode: "DRIVING",
    waypoints: await getWayPoints(),
    optimizeWaypoints: true,
  };

// try to do this code block and if it fails, run the catch block to handle errors
  try {
    console.log('RouteOptions:', routeOptions)
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

// format the waypoints from the list of places
function getWayPoints() {
  // removes the first and last index of places array
  // those will be sent seperately as origin and destination
  var tempPlaces = places.slice(1, places.length - 1)

  // empty array to hold our results
  var finalPlaces = [];

// promise makes sure this function wont return until we finish working on it
  return new Promise((res, rej) => {

    // loop through tempPlaces
    tempPlaces.map((location, i) => {
      
      // google's waypoints needds us to take each individual place 
      // and wrap in an object with a stopover key
      finalPlaces.push({ location, stopover: true })

      // if we just finished with the last index of the array then 
      // resolve the promise with the final updated array
      if (i === tempPlaces.length - 1) {
        console.log("FinalPlaces:", finalPlaces)
        res(finalPlaces)
      }
    })


  })
}