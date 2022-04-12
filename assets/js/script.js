
/* -------------------------------------------------------------------------- */
// Yelp api request

var bearer_token =
    "KNzo5Qc9AI4wBhsJRiQb47rkb3LmpBO6LCIrWXFTEXnO9gAH0hUhvx7Em0iYsE1AQL3_FfHiq__AJaQawUsPl8TNjN747zm7XczRFIDVYIaUAmATp_LD8gdKvmdUYnYx";
  var url =
    "https://floating-headland-95050.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=toronto";
  var bearer = "Bearer " + bearer_token;
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: bearer,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
    
    
    
    
    
    
    
    
    
    
  