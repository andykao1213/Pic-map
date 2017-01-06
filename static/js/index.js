var toolbar_show=1

function slide(){
  if(toolbar_show == 1){   
    document.getElementById("toolbar").style.transform = "translateX(-360px)";
    //document.getElementById("line1").style.transform = "translate(-50%, -200%) rotate(45deg)"
    //document.getElementById("line2").style.transform = "translate(-50%, 180%) rotate(-45deg)"
    toolbar_show=0;
  }   
  else{    
    document.getElementById("toolbar").style.transform = "translateX(0px)";
    //document.getElementById("line1").style.transform = "translate(-50%, -200%) rotate(-45deg)"
    //document.getElementById("line2").style.transform = "translate(-50%, 180%) rotate(45deg)"
    toolbar_show = 1;
  }
}

/*function initialize() {

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
    zoom: 12,
    center: new google.maps.LatLng(40.6743890, -73.9455),
    styles: styleArray
  };

  var map = new google.maps.Map(document.getElementById('map'),
    mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);*/