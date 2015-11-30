$(document).on('mobileinit', function(){
	console.log('mobileinit');
});

$(document).on('pageshow','#homePage', function(){

	console.log('pageshow');
	$.mobile.activePage.find('.map').leaflet();
	if(currentBuildingId != 999){
		markers[currentBuildingId].openPopup();
		currentBuildingId = 999;
	}
	// if((myPosition[0]!=0)&(myPosition[1]!=0)){
	// 	markerMyPosition.openPopup();
	// }
});

