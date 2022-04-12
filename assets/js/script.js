

/* -------------------------------------------------------------------------- */
// Yelp api request


var city1 = 'venice';


var CitySearch = document.querySelector('#Search-btn');
var CitySubmit = document.querySelector('#Submit-btn');
/* ------------------------------- Search BTN ------------------------------- */




var CitySearchFun = function (event) {
  event.preventDefault();

  var city = CitySearch.value.trim();
  console.log(city1)

  city1 = city

  

} 

CitySubmit.addEventListener('click', CitySearchFun)




/* -------------------------------------------------------------------------- */






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


    fetchApiData(category, city1)
}



categorySelected.addEventListener('click', formCatChoice);





/* -------------------------------------------------------------------------- */



    // add ccategies to the list 
    const opt = document.createElement('option');
                  opt.innerText = "yoo";
                //   opt.value.add('yoo');
                opt.classList.add('yoy')
                 
                  var addCat = document.querySelector('#cat-list');

                  addCat.appendChild(opt);



    
    
  