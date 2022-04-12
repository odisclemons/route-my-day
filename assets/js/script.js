

// Yelp api request


function fetchApiData(term1) {

var bearer_token =
    "KNzo5Qc9AI4wBhsJRiQb47rkb3LmpBO6LCIrWXFTEXnO9gAH0hUhvx7Em0iYsE1AQL3_FfHiq__AJaQawUsPl8TNjN747zm7XczRFIDVYIaUAmATp_LD8gdKvmdUYnYx";

    var location1 = 'toronto'
    // var term1 = 'shopping'


  var url =
    'https://floating-headland-95050.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=' + location1 + '&term=' + term1 ;
    // console.log(location1)
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


}


// fetchApiData()

/* -------------------------- select from drop down ------------------------- */
// grab text from elemnt that is selected
var categorySelected = document.querySelector('#cat-btn');

var CatChoice = document.querySelector('#cat-list');

var formCatChoice = function (event) {
    event.preventDefault();

    var category = CatChoice.value.trim();

    console.log(category)
    console.log("yo")


    fetchApiData(category)
}



categorySelected.addEventListener('click', formCatChoice);
    
    
  