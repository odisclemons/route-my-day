


// Yelp api request


var city = 'venice';
var businesses = [];
var places = [];

var CitySearch = document.querySelector('#Search-btn');
var CitySubmit = document.querySelector('#Submit-btn');
var SearchBox = document.querySelector('#Search-box');
SearchBox.value = city;

var busContainer = document.getElementById('bus')

var CatList = document.querySelector('#cat-list');


/* ------------------------------- Search BTN ------------------------------- */




var CitySearchFun = function (event) {
  event.preventDefault();
  if(!SearchBox.value || SearchBox.value.length < 2) {
    alert('You must specify a city.')
    return;
  }

  if(!CatList.value){
    alert('You must specify a category.')
    return;
  }

  city = CitySearch.value.trim();
  console.log(city)

  // city1 = city

  

} 

CitySubmit.addEventListener('click', CitySearchFun)




/* -------------------------------------------------------------------------- */



/* ------------------------ click btn to add to list ------------------------ */

function handleAddClick(i){
  console.log(i)
  console.log(businesses[i])
  let {latitude, longitude} = businesses[i].coordinates

  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: latitude, lng: longitude},
    zoom: 17,
  });

  places.push(businesses[i])
}


function fetchApiData(term1, city) {

var bearer_token =
    "KNzo5Qc9AI4wBhsJRiQb47rkb3LmpBO6LCIrWXFTEXnO9gAH0hUhvx7Em0iYsE1AQL3_FfHiq__AJaQawUsPl8TNjN747zm7XczRFIDVYIaUAmATp_LD8gdKvmdUYnYx";

    // var city = 'toronto'
    // var term1 = 'shopping'

    console.log(city + "in fetchApiData")


  var url =
    'https://floating-headland-95050.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=' + city + '&term=' + term1 ;
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

      let {name, url, display_phone, image_url} = data.businesses[i]
      if(!image_url) image_url = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"

      var newBox = `
      <div class="box">
        <h3>${name}</h3>
       <h3>Phone:${display_phone}</h3>

        <button name="btn-${i}" class="addToList" onclick="handleAddClick(${i})">Add to list</button>
        <div> <img src="${image_url}" /> </div>
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



    fetchApiData(category, city)
}



CatList.addEventListener('change', formCatList);


/* ------------------------------ Sortable list ----------------------------- */

$( function() {
  $( "#sortable" ).sortable();
} );











    
          