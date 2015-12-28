/*!
 * jQuery Mobile Widget v1.0
 * https://github.com/sebastian-meier/jquery.mobile.leaflet
 *
 * Copyright 2013, Sebastian Meier
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * This plugin requires the jQuery-, jQuery-Mobile & the Leaflet-Library
 *
 */
(function testss($) {
	$.widget( "mobile.leaflet", $.mobile.widget, {
		options: {
			//Determin if the attribution label for leaflet should be displayed
			leafletAttribution:true,
			//Default Config Object for map initialization
			config : {
				// zoomControl: false,
  				minZoom: 1,
  				maxZoom: 4,
  				center: [0, 0],
  				zoom: 1,
  				crs: L.CRS.Simple
			},
			initSelector: ".map"
		},

		_create: function() {
         	var imageUrl = 'img/lsc.jpg';
			var self = this,
			options = $.extend(
				this.options,
				this.element.jqmData('options')
			),
			map = {
				element: this.element,
				id: this.element.attr('id'),
				map: undefined,
				//These 3 array-sets are meant to hold 'pointers' to the data added to our map object for easier access
				marker:[],
				layer:[],
				lines:[]
			};
			self.map = map;

			//Check if the map-container has data-parameters for zoom and default map center
			if( typeof self.map.element.attr('data-zoom') !== 'undefined'){
				self.options.config.zoom = $(this).attr('data-zoom');
			}
			if( typeof self.map.element.attr('data-lat') !== 'undefined' && typeof self.map.element.attr('data-lng') !== 'undefined' ){
				self.options.config.center=[self.map.element.attr('data-lat'),self.map.element.attr('data-lng')];
			}

			//Initialize the map object
			self.map.map = new L.map(
				self.map.id,
				self.options.config
			);

			//Remove the "Leaflet" prefix if set in the options
			if(!options.config.leafletAttribution){
				self.map.map.attributionControl.setPrefix('');
			}


			// calculate the edges of the image, in coordinate space
			var southWest = self.map.map.unproject([0, mapHeight], self.map.map.getMaxZoom()-1);
			var northEast = self.map.map.unproject([mapWidth, 0], self.map.map.getMaxZoom()-1);
			var bounds = new L.LatLngBounds(southWest, northEast);

			var overlay = L.imageOverlay(imageUrl, bounds).addTo(self.map.map);
			self.map.map.setMaxBounds(bounds);	
	


			 var buildingIcon = L.icon({
    			iconUrl: 'img/icons/building.png',
    			iconSize:     [30, 30] // size of the icon
			});

			
			for (var i = 0; i < buildings.length; i++) {
				var x_y_leaf = pixel2leaflet(buildings[i].lat,buildings[i].longi);

  				var marker = L.marker(x_y_leaf,{icon: buildingIcon}).addTo(self.map.map);
  				markers.push(marker);  				
  				markers[i].bindPopup('<a  onClick = renderBuildingPage('+i+')>'+buildings[i].name+'</a>');
  				markers[i].addTo(self.map.map);
  				// markers are invisible
  				markers[i].setOpacity(0);
  			}
  			


  			var locationIcon = L.icon({
    			iconUrl: 'img/icons/location.png',
    			iconSize:     [30, 50] // size of the icon
			});

  			markerMyPosition = L.marker(myPosition,{icon: locationIcon}).addTo(self.map.map);
  			markerMyPosition.bindPopup('You are here!');
  			markerMyPosition.addTo(self.map.map);
  			markerMyPosition.setOpacity(0);


  			var locationIcon2 = L.icon({
    			iconUrl: 'img/icons/location.png',
    			iconSize:     [10, 15] // size of the icon
			});
		function locationOnSuccess(location) {

        //device's latitude
        myPosition[0] = location.coords.latitude;
        //device's longitude
        myPosition[1] = location.coords.longitude;

        // testing
        var myFinalPosition = coord2leaflet(myPosition[0],myPosition[1])
        markerMyPosition.setLatLng(myFinalPosition).update();
            markerMyPosition.setOpacity(1);
            markerMyPosition.openPopup();

      }

      function locationOnFail(error) {
        console.log("error trying to find location!")
      }


			
  			// var calibPosition1=coord2leaflet(41.999183,-87.6573519);
  			// var calibPosition2=coord2leaflet(41.9975592,-87.657218);	
  			// var markerCalibration1 = L.marker(calibPosition1,{icon: locationIcon2}).addTo(self.map.map);
  			// var markerCalibration2 = L.marker(calibPosition2,{icon: locationIcon2}).addTo(self.map.map);
  			L.easyButton('fa-location-arrow', function(){ navigator.geolocation.getCurrentPosition(locationOnSuccess,
          locationOnFail, {
          timeout: 15000,
          enableHighAccuracy: true
        });}).addTo(self.map.map);


		},



		//If latitude comes with "," instead of "." replace them (european)
		cleanCoordinate: function(coord){
			switch(typeof coord){
				case 'String':
					return parseFloat(coord.replace(',', '.'));
				break;
				case 'number':
					return parseFloat(coord);
				break;
				default:
					return coord;
				break;
			}
		},

		//Remove all marker from the map
		clearMarker: function(){
			var self = this;
			$.each(self.map.marker, function(index, value){
				self.map.map.removeLayer(value);
			});
			self.map.marker = [];
		},

		//Remove all lines from the map
		clearLines: function(){
			var self = this;
			$.each(self.map.lines, function(index, value){
				self.map.map.removeLayer(value);
			});
			self.map.lines = [];
		},

		//Remove all layers from the map
		clearLayer: function(){
			var self = this;
			$.each(self.map.layer, function(index, value){
				self.map.map.removeLayer(value);
			});
			self.map.layer = [];
		},

		getMap: function() {
			return this.map.map;
		},
		getData: function(){
			return this.map;
		}

	});
})( jQuery );