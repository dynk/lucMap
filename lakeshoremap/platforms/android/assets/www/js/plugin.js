(function() {
	$(document).on("pageinit", "#homePage", function(e) {
		//prevent any bound defaults
		e.preventDefault();

		//loader function after deviceready event returns
		function onDeviceReady() {

			function onSuccess(location) {

				//device's latitude
				myPosition[0] = location.coords.latitude;
				//device's longitude
				myPosition[1] = location.coords.longitude;

				// testing
				myPosition[0] = 20;
				myPosition[1] = 10;
				markerMyPosition.setLatLng(myPosition).update();
      			markerMyPosition.setOpacity(1);
      			markerMyPosition.openPopup();
      			// $( "#bars" ).panel( "close" );

				//output result to #location div...
				// $("#location").append("<p>my latitude = "+myLatitude+"</p><p>my longitude = "+myLongitude+"</p>");
			}

			function onFail(error) {
				// $("#location").append("location error code = "+error.code+" message = "+error.message);
				console.log("error trying to find location!")
			}

			function getLocation() {
				navigator.geolocation.getCurrentPosition(onSuccess,
					onFail, {
					timeout: 15000,
					enableHighAccuracy: true
				});
			}

			//handle button press for geolocation
			$("#getLocation").on("tap", function(e) {
				e.preventDefault();
				getLocation();
				$( "#leftpanel" ).panel( "close" );
			})

		}
		//as deviceready returns load onDeviceReady()
		$(document).on("deviceready", onDeviceReady);
	});

})();
