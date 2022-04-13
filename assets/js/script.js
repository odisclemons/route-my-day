


// Yelp api request


var city1 = 'venice';


var CitySearch = document.querySelector('#Search-btn');
var CitySubmit = document.querySelector('#Submit-btn');

var busContainer = document.getElementById('bus')


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
    .then(function (data) {
      
      console.log(data);
      console.log('is it working')

      console.log(data.businesses[0].alias)
   
      console.log(data.total)

      // var Name = document.createElement('h3');
      // Name.textContent = data.businesses[0].alias;

      // console.log(Name)
      

      // // 


     

      // issueContainer.appendChild(Name);
    


    // render data
    for (var i = 0; i < 20; i++) {
     
      var Name = document.createElement('h3');
      var web = document.createElement('p');
      var lat = document.createElement('h2')
      var lon = document.createElement('h2')
      var btn = document.createElement('BUTTON');

      var boxForElements = document.createElement('a');

      boxForElements.classList = 'box';

      Name.textContent = data.businesses[i].alias;
      web.textContent = data.businesses[i].url;
      lat.textContent = data.businesses[i].coordinates.latitude
      lon.textContent = data.businesses[i].coordinates.longitude
      btn.textContent = 'Add to list';

      btn.classList = "addToList"
      lat.classList = "lat"
      lon.classList = "lon"

      boxForElements.appendChild(Name);
      boxForElements.appendChild(web);
      boxForElements.appendChild(lat);
      boxForElements.appendChild(lon);
      boxForElements.appendChild(btn);

      busContainer.appendChild(boxForElements)

      // console.log(Name);
      
      // busContainer.append(Name);
      // busContainer.append(web);
      // busContainer.append(lat);
      // busContainer.append(lon);
    }
    });

    // .catch((error) => console.log(error));




}


    
    /* ------------------------ click btn to add to list ------------------------ */

   var CoordinatesList = [];

    var AddCooridatesToList = document.getElementsByClassName('addToList');
    AddCooridatesToList.onclick = function() {

      console.log("You clicked it")

      // var latCor = document.getElementsByClassName('lat');
      // var lonCor = document.getElementsByClassName('lon');

      // CoordinatesList.push(latCor);
      // CoordinatesList.push(lonCor);

      // console.log(CoordinatesList)

	
}




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






/* -------------------------- boxes for each search ------------------------- */
// idenfiers in html





/* -------------------------------------------------------------------------- */



    // add ccategies to the list 
    const opt = document.createElement('option');
                  opt.innerText = "yoo";
                //   opt.value.add('yoo');
                opt.classList.add('yoy')
                 
                  var addCat = document.querySelector('#cat-list');

                  addCat.appendChild(opt);



    
          