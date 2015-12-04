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
			// //Default TileLayer
			// tileLayer:{
			// 	url:'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			// 	config:{
			// 		layers: '',
   //  				format: 'image/png',
			// 		transparent: true,
			// 		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			// 	},
			// 	wms:false
			// },
			// marker:{
			// },
			initSelector: ".map"
		},

		_create: function() {
			// var imageBoundsCoord = {
   //          	north: 42.0027041,
   //          	south: 41.9946522,
   //          	east: -87.6535342,
   //          	west: -87.6618519
   //       	};
   //       	imageBounds = L.latLngBounds([
   //      		[imageBoundsCoord.south, imageBoundsCoord.west],
   //      		[imageBoundsCoord.north, imageBoundsCoord.east]]);
         	var imageUrl = 'img/lsc.png';





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

			//Add the default TileLayer as set in options and add it to our layer-set
			// if(options.tileLayer.wms){
			// 	self.map.layer.push(L.tileLayer.wms(options.tileLayer.url, options.tileLayer.config).addTo(self.map.map));
			// }else{
			// 	self.map.layer.push(L.tileLayer(options.tileLayer.url, options.tileLayer.config).addTo(self.map.map));	
			// }



			// calculate the edges of the image, in coordinate space
			var southWest = self.map.map.unproject([0, mapHeight], self.map.map.getMaxZoom()-1);
			var northEast = self.map.map.unproject([mapWidth, 0], self.map.map.getMaxZoom()-1);
			var bounds = new L.LatLngBounds(southWest, northEast);

			var overlay = L.imageOverlay(imageUrl, bounds).addTo(self.map.map);
			self.map.map.setMaxBounds(bounds);	
	





			//Check if the map-container has data-parameters for a marker
			// if( typeof self.map.element.attr('data-marker-lat') !== 'undefined' && typeof self.map.element.attr('data-marker-lng') !== 'undefined' ){
			// 	self.createMarker([self.map.element.attr('data-marker-lat'),self.map.element.attr('data-marker-lng')]);
			// }

			// if( eval('typeof '+self.map.id+'_marker') !== 'undefined' ){
			// 	$.each(eval(self.map.id+'_marker'), function(index, value) {
			// 		self.createMarker(value);
			// 	});
			// }
			 var buildingIcon = L.icon({
    			iconUrl: 'img/icons/building.png',
    			iconSize:     [20, 20] // size of the icon
			});

			
			for (var i = 0; i < buildings.building.length; i++) {
				var x_y_leaf = pixel2leaflet(buildings.building[i].lat,buildings.building[i].longi);
  				// var marker = L.marker([buildings.building[i].lat,buildings.building[i].longi],{icon: buildingIcon}).addTo(self.map.map);
  				// markers.push(marker);
  				var marker = L.marker(x_y_leaf).addTo(self.map.map);
  				markers.push(marker);  				
  				markers[i].bindPopup('<a  onClick = renderBuildingPage('+i+')>'+buildings.building[i].name+'</a>');
  				// markers[i].bindPopup('<p>'+buildings.building[i].name+'</p> <button onClick = renderBuildingPage('+i+')>Description</button>');
  				// markers[i].bindPopup(buildings.building[i].name);
  				markers[i].addTo(self.map.map);
  			}
  			markers[0].setOpacity(0);


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
		function onSuccess2(location) {

        //device's latitude
        myPosition[0] = location.coords.latitude;
        //device's longitude
        myPosition[1] = location.coords.longitude;

        // testing
        var myFinalPosition = coord2leaflet(myPosition[0],myPosition[1])
        // var myFinalPosition = coord2leaflet(41.998183,-87.6573519);
        markerMyPosition.setLatLng(myFinalPosition).update();
            markerMyPosition.setOpacity(1);
            markerMyPosition.openPopup();
            // $( "#bars" ).panel( "close" );

        //output result to #location div...
        // $("#location").append("<p>my latitude = "+myLatitude+"</p><p>my longitude = "+myLongitude+"</p>");
      }

      function onFail2(error) {
        // $("#location").append("location error code = "+error.code+" message = "+error.message);
        console.log("error trying to find location!")
      }


			
  			// var calibPosition1=coord2leaflet(41.999183,-87.6573519);
  			// var calibPosition2=coord2leaflet(41.9975592,-87.657218);	
  			// var markerCalibration1 = L.marker(calibPosition1,{icon: locationIcon2}).addTo(self.map.map);
  			// var markerCalibration2 = L.marker(calibPosition2,{icon: locationIcon2}).addTo(self.map.map);
  			L.easyButton('fa-location-arrow', function(){       navigator.geolocation.getCurrentPosition(onSuccess2,
          onFail2, {
          timeout: 15000,
          enableHighAccuracy: true
        });}).addTo(self.map.map);




  // var offset1 = 1840;
  // var offset2 = 770;
  // var testPosition=pixel2leaflet(20,20);
  // 			var markerTest = L.marker(testPosition,{icon: locationIcon2}).addTo(self.map.map);






		},

		//Create a marker and add it to the map
		//The marker is created from the marker-config in the options
		//data:
		//	Array of float/integer/string: [52.52,13.41]
		//	Object: {lat:52.52, lng:13.41}
		//	Object with Marker Config: {lat:52.52, lng:13.41, icon:L.Icon(), title:'', clickable:true, ...}
		// createMarker: function(data){
		// 	var lat, lng, self = this;
		// 	if(data instanceof Array){
		// 		lat = data[0];
		// 		lng = data[1];
		// 	}else if(data instanceof Object){
		// 		lat = data.lat;
		// 		lng = data.lng;
		// 		var options = $.extend(
		// 			this.options.marker,
		// 			data
		// 		);
		// 	}else{
		// 		return undefined;
		// 	}


		// 	var marker = L.marker(new L.LatLng(self.cleanCoordinate(lat), self.cleanCoordinate(lng)), options);
		// 	marker.addTo(self.map.map);
		// 	self.map.marker.push(marker);

		// 	return marker;
		// },

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