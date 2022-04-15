// Yelp api request

var businesses = [];
var places = [];

var CitySearch = document.querySelector('#Search-btn');
var CitySubmit = document.querySelector('#Submit-btn');
var SearchBox = document.querySelector('#Search-box');

var BtnDone = document.querySelector('#btn-done')
SearchBox.value = "Orlando";

var busContainer = document.getElementById('bus')

var CatList = document.querySelector('#cat-list');

var ResultsSection = document.querySelector('#results-section')

/* --------------------------- add to places list --------------------------- */

function createPlacesList() {
  var jQueryPlaces = document.querySelector('#sortable');

  for (var i = 0; i < jQueryPlaces.children.length + 1; i++) {
    if (i === jQueryPlaces.children.length) {
      updateMap(places.slice(1, places.length - 2))
      return
    }
    var listLongitude = jQueryPlaces.children[i].getAttribute('data-longitude')
    var listLatitude = jQueryPlaces.children[i].getAttribute('data-latitude')
    places.push({ lat: Number(listLatitude), lng: Number(listLongitude) })

  }

}
BtnDone.addEventListener('click', createPlacesList)



// var language = event.target.getAttribute('data-language');



/* ------------------------ click btn to add to list ------------------------ */

function handleAddClick(i) {
  console.log(i)
  console.log(businesses[i])
  let { latitude, longitude } = businesses[i].coordinates
  let { name, image_url } = businesses[i]
  // adding to j query UI 

 

  var newJquryuiItem = `
     <li data-latitude='${latitude}' data-longitude='${longitude}' class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s" id='#btn-id${i}' ></span>${name} <button onclick="removePlaceFromList()" class="button is-small is-rounded" style="background-color: #9681E6;">Remove</button></li>
    

    `
  $('#sortable').append(newJquryuiItem)


  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: latitude, lng: longitude },
    zoom: 17,
  });
  // places.push(businesses[i])
  // replaces with places list {lat: latitude, lng: longitude}
}

/* ------------------------------ remove button place list button ----------------------------- */

function removePlaceFromList() {

  console.log("are u working")
  console.log(this.event.target.parentElement)
  this.event.target.parentElement.remove()
 

}


// fetch data from Yelp
function fetchApiData(location1, city) {

  var bearer_token =
    "KNzo5Qc9AI4wBhsJRiQb47rkb3LmpBO6LCIrWXFTEXnO9gAH0hUhvx7Em0iYsE1AQL3_FfHiq__AJaQawUsPl8TNjN747zm7XczRFIDVYIaUAmATp_LD8gdKvmdUYnYx";

  console.log(city + " in fetchApiData")


  var url =
    'https://floating-headland-95050.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=' + city + '&term=' + location1;

  var bearer = "Bearer " + bearer_token;

// fetch data from Yelp
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
      businesses = data.businesses;
      console.log(data)
      $('#bus').html(null)

      // render data
      for (var i = 0; i < 10; i++) {

        let { name, url, display_phone, image_url, rating } = data.businesses[i]

        // if no image, replace with generic placeholder
        if (!image_url) image_url = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"

        console.log(data.businesses[i])

        /* ----------------------------------Yelp Cards---------------------------------------- */
        var newBox = `
                <div class="card card-yelp">
                
                  <div class="card-content">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image" style="width: 128px">
                          <img src="${image_url}" alt="Placeholder image" class="yelp-img">
                        </figure>
                      </div>
                      
                  
                      </div>
                    
                      <!--<button class="modal-close is-large" aria-label="close"></button>-->
                    </div>

                      <div class="media-content">
                        <p class="title is-4">${name}</p>
                        <p class="subtitle">Rating: ${rating}</p>
                        <p class="subtitle is-6">${display_phone}</p>
                        <button class="button is-rounded is-small yelp-btn" onclick="window.open('${url}', '_blank')">Website</button>
                        <div class="content">
                          <button name="btn-${i}" class="addToList button is-rounded is-small yelp-btn" onclick="handleAddClick(${i})"><i class="fas fa-plus-circle"></i>Add to list</button>
                          <br>

                         
                        </div>
                      </div>
                    </div>

                  </div>
                </div> `


        $('#bus').append(newBox)
      }
    }).catch((error) => console.log('Error fetchin Yelp data:',error));

}

/* ------------------------------- Search BTN ------------------------------- */
CitySubmit.addEventListener('click', formCatList)


/* -------------------------- Submit Button Code ------------------------- */
// grab text from elemnt that is selected and fetch api data


function formCatList (event) {
  event.preventDefault();
  if (!SearchBox.value || SearchBox.value.length < 2) {
    alert('You must specify a city.')
    return;
  }

  if (!CatList.value) {
    alert('You must specify a category.')
    return;
  }


  var category = CatList.value.trim();
  var city = SearchBox.value.trim();
  
  console.log(category)
  console.log(city)

  fetchApiData(category, city)
  
  $("#bus").show()
  $("#section-results").show('linear', ()=>{

    setTimeout(()=> {
      $([document.documentElement, document.body]).animate({
        scrollTop: $("#section-results").offset().top
    }, 500);
    }, 500)
      
  })
  // $("#bus").show(()=> ResultsSection.scrollIntoView())

}


// if they change the dropdown, do query again with new option
// CatList.addEventListener('change',formCatList);


/* ------------------------------ Sortable list ----------------------------- */

$(function () {
  $("#sortable").sortable();
});







