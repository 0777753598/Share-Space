var lng = document.getElementsByName('lng')[0];
var lat = document.getElementsByName('lat')[0];


// initialize the google map
function initMap() {
    var googleMap = document.getElementById('googleMap');
    var thisMarker= null;
    var mapProp= {
        center:new google.maps.LatLng(6.9271, 79.8612),
        zoom:15,
    };
    
    var map=new google.maps.Map(googleMap,mapProp);


    
// add a event listener to the map to create the marker  
    map.addListener('click', function(e){
        
        placeMarker(e.latLng , map);
        console.log(e);
    });

//create the marker object
    function placeMarker(latLng , map){
        checkMarker();
        var marker = new google.maps.Marker({
            position:latLng,
            map:map
        });
        thisMarker = marker;
        map.panTo(latLng);  // focus to the marked location (center)

        // change the form lat and lng input fields
        lat.value = latLng.lat();
        lng.value = latLng.lng();
       
    }
//check already a marker is being set, if yes clear it form the map
    function checkMarker(){
        if (thisMarker != null){
            thisMarker.setMap(null);
        }
    }

    findPlace(map);
}
// map to  show dtails about the already marked places
function searchMap(){

    var googleMap = document.getElementById('googleMap');
    var thisMarker= null;
    var mapProp= {
        center:new google.maps.LatLng(6.9271, 79.8612),
        zoom:13
    };
    
    var map=new google.maps.Map(googleMap,mapProp);

    //  send a ajax request to get data from the server
    var xmlhttp;
    if (window.XMLHttpRequest) {
    // code for modern browsers
    xmlhttp = new XMLHttpRequest();
    } else {
    // code for old IE browsers
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
         var data = JSON.parse(this.responseText);
        // for each json object getin from the server add a marker
        for (var i = 0; i< data.length; i++){

            var marker = new google.maps.Marker({
            position:data[i].position,
            map:map
        
        });

        }
        
    }

    }

    //send ajax req to the server
    xmlhttp.open("GET", "/data", true);
    xmlhttp.send();

    findPlace(map);

}

function findPlace(map) {

    //get the input and link it to the google maps
    var input = document.getElementsByClassName('search')[0];
    var searchBox = new google.maps.places.SearchBox(input);

    // when a place is search in the search bar show it on the map
    searchBox.addListener('places_changed',function(){
        var places = searchBox.getPlaces();

        if (places.length == 0){
            return ;
        }
        //focus the user has searched
        map.setCenter(places[0].geometry.location);
        map.setZoom(14);

    });

}
