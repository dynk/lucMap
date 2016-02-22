$(document).on('mobileinit', function(){
	console.log('mobileinit');
});

$(document).on('pageshow','#homePage', function(){

	console.log('pageshow');
	$.mobile.activePage.find('.map').leaflet();
	// open building pop up if any other pages set it
	if(currentBuildingFlag == true){
		markers[currentBuildingOrder].openPopup();
		currentBuildingFlag = false;
	}
		currentBuildingOrder = 999;

});
$(document).on('pageshow','#buildings', function(){

	setFavorite();

});

$(document).on('pageshow','#pageFavBuildings', function(){

	renderFavPage();

});


