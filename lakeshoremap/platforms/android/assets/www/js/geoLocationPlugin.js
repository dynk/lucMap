
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

			function getLocation() {
				navigator.geolocation.getCurrentPosition(locationOnSuccess,
					locationOnFail, {
					timeout: 15000,
					enableHighAccuracy: true
				});
			}




