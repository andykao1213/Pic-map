//document.write("<script type='text/javascript' src='https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js'></script>");
//document.write("<script type='text/javascript' src='../static/exif.js'></script>");

function getLocation(){
    for(var i=0; i<3; i++){
        console.log(neighborhoods[i]);
    }
}
var neighborhoods = [
    new google.maps.LatLng(24.983, 121.3), // lamigo
    new google.maps.LatLng(23+8/60, 120+17/60), //23.133, 120.28333
    new google.maps.LatLng(22+38/60, 120+17/60), //22.6333,120.283
];
var pictures = [];
var markers = [];
var markers2 = [];
var map;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var markerCluster; 
var markerFocus;

var infoWindow = new google.maps.InfoWindow({map: map});
//navigator.geolocation.getCurrentPosition(initialize);
//function initialize(position) {
function initialize() {

      var styleArray = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "hue": "#ff4400"
      },
      {
        "saturation": -68
      },
      {
        "lightness": -4
      },
      {
        "gamma": 0.72
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [
      {
        "hue": "#0077ff"
      },
      {
        "gamma": 3.1
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "stylers": [
      {
        "hue": "#44ff00"
      },
      {
        "saturation": -23
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "hue": "#ff9100"
      },
      {
        "saturation": -64
      },
      {
        "lightness": 16
      },
      {
        "gamma": 0.47
      },
      {
        "weight": 2.7
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "hue": "#ff5e00"
      },
      {
        "saturation": -23
      },
      {
        "lightness": -48
      },
      {
        "gamma": 1.2
      }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
      {
        "hue": "#00ccff"
      },
      {
        "saturation": -33
      },
      {
        "gamma": 0.44
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "hue": "#007fff"
      },
      {
        "saturation": 65
      },
      {
        "lightness": 99
      },
      {
        "gamma": 0.77
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "hue": "#0091ff"
      },
      {
        "saturation": 99
      },
      {
        "lightness": -86
      },
      {
        "gamma": 0.11
      },
      {
        "weight": 5.6
      }
    ]
  }
];


    var mapOptions = {
        center: new google.maps.LatLng(24.8, 120.97),
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styleArray
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

     if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    

    // if(position){
    //     map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    // }


    google.maps.event.addListener(
        map,
        'mousemove',
        function(e){
            google.maps.event.clearListeners(map, 'mouseover');    
        }
    );
    document.getElementById('map').addEventListener('drop', dropInMap);
    document.getElementById('map').addEventListener('dragover', allowDrop);
    clusterInit();

    restoreMarkers();

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

    

function dropInMap(ev) {
    ev.preventDefault();

    var data = ev.dataTransfer.getData('imgSrc');

    }

var contentString = '<button type="button" class="btn btn-danger" onclick="deleteMarker()">Delete</button>';
function dragImage(ev){
    ev.dataTransfer.setData('imgSrc', ev.target.src);

    console.log('DragImage: '+ev.target.src);
    google.maps.event.addListener(
            map,
            'mouseover',
            function(e){
              addNewMarker(e.latLng.lat(), e.latLng.lng(), ev.target.src);
            }
        );
}

function addNewMarker(lat, lng, imgSrc){
    position = new google.maps.LatLng(lat, lng);
    var picIcon = new google.maps.MarkerImage(
        imgSrc,
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(80, 60)
    );   

    // 如果要每點一下就有一個 marker，則使用此段
    var newMarker = new google.maps.Marker({
        position: position,
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        icon: picIcon//,
        //label: labels[(markers.length-1) % labels.length]
    })
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    newMarker.addListener('click', function(){
      infowindow.open(map, this);
      markerFocus = this;
    });
    newMarker.addListener('mouseover', mouseInPhoto);
    newMarker.addListener('mouseout', mouseOutPhoto);
    newMarker.addListener('dblclick', dblclickOnPhoto);
    markers.push(newMarker);
    
    //markers.push(newMarker);
    markerCluster.addMarker(newMarker, true);
    // console.log(markerCluster.getMarkers().length);
//     markerCluster = new MarkerClusterer(map, markers2,
// {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    passToBack(newMarker);
}

/*
$(function() {
  var submit_form = function(e) {
    $.getJSON($SCRIPT_ROOT + '/setMarker', {
      lat: $('input[name="marker_lat"]').val(),
      lng: $('input[name="marker_lng"]').val(), 
      img: $('input[name="marker_img"]').val()
    }, function(data) {
      //$('#result').text(data.result);
    });
    return false;
  };

   $('button#send_marker').bind('click', submit_form);
   
});
*/

function passToBack(marker){
    var lat = marker.position.lat();
    var lng = marker.position.lng();
    var img = marker.icon.url;

    document.getElementById('marker_lat_i').value = lat;
    document.getElementById('marker_lng_i').value = lng;
    document.getElementById('marker_img_i').value = img;


    //document.getElementById('marker_form').submit();
    //document.getElementById('send_marker').click();
    document.getElementById('calculate').click();
    //$('a#calculate').bind('click', submit_form);
}

function deleteMarker(){
  var lat = markerFocus.position.lat();
  var lng = markerFocus.position.lng();
  var img = markerFocus.icon.url;

  document.getElementById('marker_lat_i').value = lat;
  document.getElementById('marker_lng_i').value = lng;
  document.getElementById('marker_img_i').value = img;

  document.getElementById('delete').click();

  markerFocus.setIcon(null);
  markerFocus.setMap(null);
  var index = markers.indexOf(markerFocus);
  if (index > -1) {
    markers.splice(index, 1);
  }
  markerCluster.removeMarker(markerFocus, true);
  
  


}

function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    console.log("drag");
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    
    ev.target.appendChild(document.getElementById(data));
    console.log("drop");
}
function allowDrop(ev) {
    ev.preventDefault();
    console.log("allowDrop");
}
function clusterInit(){
    
    markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    
}

function init(){
document.write("<script type='text/javascript' src='http://maps.googleapis.com/maps/api/js?sensor=false'></script> \
    <script type='text/javascript' src='https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js'></script>");
document.write("<script type='text/javascript' src='../static/exif.js'></script>\
            <script type='text/javascript' src='../static/myMap.js'></script>");
            //console.log("init");
}