      var markers = [];
         // var myCenter=new google.maps.LatLng(41.9988543,-87.6556353);
         var imageBoundsCoord = {
            north: 42.0027041,
            south: 41.9946522,
            east: -87.6535342,
            west: -87.6618519
         };
         
      L.mapbox.accessToken = 'pk.eyJ1IjoiZHluayIsImEiOiJjaWdzZzRzeWIwMnk3dXhtMTUyeHBydXAzIn0.82RrkarfhuGM-2RAI_oRhw';

         var imageUrl = 'img/lsc.jpg',
    // This is the trickiest part - you'll need accurate coordinates for the
    // corners of the image. You can find and create appropriate values at
    // http://maps.nypl.org/warper/ or
    // http://www.georeferencer.org/

    imageBounds = L.latLngBounds([
        [imageBoundsCoord.south, imageBoundsCoord.west],
        [imageBoundsCoord.north, imageBoundsCoord.east]]);

      map = L.mapbox.map('map', 'mapbox.streets')
    .fitBounds(imageBounds);

// See full documentation for the ImageOverlay type:
// http://leafletjs.com/reference.html#imageoverlay
var overlay = L.imageOverlay(imageUrl, imageBounds)
    .addTo(map);

    //setting markers on the map
for (var i = 0; i < buildings.length; i++) {
  var marker = L.marker([buildings[i].lat,buildings[i].longi]).addTo(map);
  markers.push(marker);
  markers[i].bindPopup(buildings[i].description);
  markers[i].addTo(map);
  }




