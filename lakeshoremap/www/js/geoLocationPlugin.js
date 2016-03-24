function locationOnSuccess(location) {

    //device's latitude
    myPosition[0] = location.coords.latitude;
    //device's longitude
    myPosition[1] = location.coords.longitude;

    var myFinalPosition = coord2leaflet(myPosition[0],myPosition[1])

    // testing
    // myFinalPosition[0] = -50;
    // myFinalPosition[1] = 90;

    markerMyPosition.setLatLng(myFinalPosition).update();
    markerMyPosition.setOpacity(1);
    markerMyPosition.openPopup();
    // window.setTimeout(function(){ markerMyPosition.setOpacity(0); }, 2000000000000000000000000000000)

}

function locationOnFail(error) {
    console.log("error trying to find location!")
}

function getLocation() {
    navigator.geolocation.watchPosition(locationOnSuccess,
        locationOnFail, {
            timeout: 30000,
            enableHighAccuracy: true
        }
    );
}
