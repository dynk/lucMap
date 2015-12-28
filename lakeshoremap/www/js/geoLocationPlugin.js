
			function locationOnSuccess(location) {

				//device's latitude
				myPosition[0] = location.coords.latitude;
				//device's longitude
				myPosition[1] = location.coords.longitude;

				
				var myFinalPosition = coord2leaflet(myPosition[0],myPosition[1])

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




