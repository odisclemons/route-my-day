


// Yelp api request


var city1 = 'venice';
var businesses = [];
var wayPoints = [];

var CitySearch = document.querySelector('#Search-btn');
var CitySubmit = document.querySelector('#Submit-btn');

var busContainer = document.getElementById('bus')

var categorySelected = document.querySelector('#cat-btn');

var CatList = document.querySelector('#cat-list');


/* ------------------------------- Search BTN ------------------------------- */




var CitySearchFun = function (event) {
  event.preventDefault();

  var city = CitySearch.value.trim();
  console.log(city1)

  city1 = city

  

} 

CitySubmit.addEventListener('click', CitySearchFun)




/* -------------------------------------------------------------------------- */



/* ------------------------ click btn to add to list ------------------------ */

function handleAddClick(i){
  console.log(i)
  console.log(businesses[i])
  let {latitude , longitude} = businesses[i].coordinates

  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: latitude, lng: longitude},
    zoom: 17,
  });
}


function fetchApiData(term1, city1) {

var bearer_token =
    "KNzo5Qc9AI4wBhsJRiQb47rkb3LmpBO6LCIrWXFTEXnO9gAH0hUhvx7Em0iYsE1AQL3_FfHiq__AJaQawUsPl8TNjN747zm7XczRFIDVYIaUAmATp_LD8gdKvmdUYnYx";

    // var city = 'toronto'
    // var term1 = 'shopping'

    console.log(city1 + "in fetchApiData")


  var url =
    'https://floating-headland-95050.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=' + city1 + '&term=' + term1 ;
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
    .then(function (data) {
      
      console.log(data);
      console.log('is it working')

      console.log(data.businesses[0].alias)
      businesses = data.businesses;
      $('#bus').html(null)
    


    // render data
    for (var i = 0; i < 20; i++) {

      let {alias, url, coordinates} = data.businesses[i]

      var newBox = `
      <div class="box">
        <h3>${alias}</h3>
        <h2 class="lat">${coordinates.latitude}</h2>
        <p>${url}</p>
        <h2 class="lon">${coordinates.longitude}</h2>

        <button name="btn-${i}" class="addToList" onclick="handleAddClick(${i})">Add to list</button>

    </div>
      `
      $('#bus').append(newBox)
    }
    });

    // .catch((error) => console.log(error));




}


    
    




/* -------------------------- select from drop down ------------------------- */
// grab text from elemnt that is selected


var formCatList = function (event) {
    event.preventDefault();

    var category = CatList.value.trim();

    console.log(category)



    fetchApiData(category, city1)
}



CatList.addEventListener('change', formCatList);












    
          