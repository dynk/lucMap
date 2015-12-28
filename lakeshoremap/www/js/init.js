$(document).on('mobileinit', function(){
	console.log('mobileinit');
});

$(document).on('pageshow','#homePage', function(){

	console.log('pageshow');
	$.mobile.activePage.find('.map').leaflet();
	if(currentBuildingOrder != 999){
		markers[currentBuildingOrder].openPopup();
		currentBuildingOrder = 999;
	}

});

