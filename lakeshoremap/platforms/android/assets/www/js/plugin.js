(function() {
	$(document).on("pageinit", "#homePage", function(e) {
		//prevent any bound defaults
		e.preventDefault();

		//loader function after deviceready event returns
		function onDeviceReady() {

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
