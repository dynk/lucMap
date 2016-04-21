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
(function($) {
	$.widget( "mobile.leaflet", $.mobile.widget, {
		options: {
			//Determin if the attribution label for leaflet should be displayed
			leafletAttribution:true,
			//Default Config Object for map initialization
			config : {
				// zoomControl: false,
  				minZoom: 1,
  				maxZoom: 4,
  				zoomControl:false,
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
	

			// Icon that is gonna be used on markers
			 var buildingIcon = L.icon({
    			iconUrl: 'img/icons/building.png',
    			iconSize:     [40, 40] // size of the icon
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

		function locationOnSuccess(location) {

        //device's latitude
        myPosition[0] = location.coords.latitude;
        //device's longitude
        myPosition[1] = location.coords.longitude;


        verifyMyPosition();
        
      }

      function locationOnFail(error) {
		  clearWatch();
		  alert("Error trying to find location! Try to enable GPS for this App");
        console.log("Error trying to find location!")
      }


  		var watchID = null;
  		var openPopUpOnceFlag = true;
  		var optionsWatchPosition = {
          timeout: 60000,
          enableHighAccuracy: true
        };

      	function clearWatch() {
        	if (watchID != null) {
            	navigator.geolocation.clearWatch(watchID);
            	watchID = null;
            	markerMyPosition.setOpacity(0);
            	openPopUpOnceFlag = true;
        	}
    	}
    	function startWatch() {
			watchID = navigator.geolocation.watchPosition(locationOnSuccess, locationOnFail, optionsWatchPosition);
    	}
    	function verifyMyPosition() {

        		var myFinalPosition = coord2leaflet(myPosition[0],myPosition[1]);

        		if(isInsideCampus(myFinalPosition)){
        			markerMyPosition.setLatLng(myFinalPosition).update();
            		markerMyPosition.setOpacity(1);
            		if(openPopUpOnceFlag){
            			markerMyPosition.openPopup();
            			openPopUpOnceFlag = false;
            			closePopUpDelay();
            		}
            		
        		}else{
        			alert("You are not on Campus...");
        			clearWatch();
        		}
    	}

  		function findMyPosition() {
  			//prevents to open more than one popup per time
  			self.map.map.closePopup();
  			if (watchID == null) {
  				openPopUpOnceFlag = true;
        		startWatch();
        	}else{
        		markerMyPosition.openPopup();
        		closePopUpDelay();
        		openPopUpOnceFlag = false;
        	}
      	}
      	function closePopUpDelay() {
    		setTimeout(function(){ self.map.map.closePopup(); }, 3000);
		}



  		L.easyButton('fa-location-arrow', findMyPosition).addTo(self.map.map);

  		//Centralize any marker to the map, including buildings and my position
		self.map.map.on('popupopen', function(e) {
    		var px = self.map.map.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is
    		px.y -= e.popup._container.clientHeight/2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    		self.map.map.panTo(self.map.map.unproject(px),{animate: true}); // pan to new center
		});



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