// render 3 diferents kind of list
// opcode = 1 - explore building list
// opcode = 2 - favorite buildings
// opcode = 3 - favorite buildings
// opcode = 4 - search building
function createListBuilding(buildingsJson, opCode) {

    switch (opCode) {
        case 1:
            var ordenationAux = sortListFunction(buildingsJson);
            var result = "";
            result += "<ul id='searchBar' data-role='listview'> ";
            for (var i = 0; i < buildingsJson.length; i++) {
                // result += "<li><a onClick = 'renderBuildingPage("+i+")'>"+ buildingsJson[i].name;
                result += "<li><a onClick='renderBuildingPage(" + ordenationAux[i][1] + ")'>" + ordenationAux[i][0];
                result += "</a></li>";
            }
            result += "</ul>";
            break;

        case 2:
            var ordenationAux = sortListFunction(buildingsJson);
            var result = "";
            result += "<ul id='searchBar2' data-role='listview'> ";
            for (var i = 0; i < buildingsJson.length; i++) {
                // result += "<li><a onClick = 'renderBuildingPage("+i+")'>"+ buildingsJson[i].name;
                result += "<li><a href='#pageFavBuildings' onClick='saveBuilding(" + ordenationAux[i][1] + ")'>" + ordenationAux[i][0];
                result += "</a></li>";
            }
            result += "</ul>";
            break;

        case 3:
            var result = "";
            // result += "<ul id='listViewFavBuilding' data-role= 'listview'> ";
            for (var i = 0; i < buildingsJson.length; i++) {
                result += "<li><a onClick='renderBuildingPage(" + buildingsJson[i][0] + ")'>" + buildingsJson[i][1];
                result += "</a></li>";
            }
            break;

        case 4:
            var ordenationAux = sortListFunction(buildingsJson);
            var result = "";
            result += "<ul id='searchBar' data-role='listview' data-filter='true' data-filter-placeholder='Search buildings...'> ";
            for (var i = 0; i < buildingsJson.length; i++) {
                // result += "<li><a onClick = 'renderBuildingPage("+i+")'>"+ buildingsJson[i].name;
                result += "<li><a href='#homePage' onClick='setcurrentBuilding(" + ordenationAux[i][1] + ")'>" + ordenationAux[i][0];
                result += "</a></li>";
            }
            result += "</ul>";
            break;

        default:
            break;
    }

    return result;
}

var total = createListBuilding(buildings, 1);
document.getElementById('listBuilding').innerHTML = total;
var total2 = createListBuilding(buildings, 2);
document.getElementById('listAllFavBuilding').innerHTML = total2;
var total4 = createListBuilding(buildings, 4);
document.getElementById('listBuilding2').innerHTML = total4;

// change to home page and hide your position
function showBuilding() {
    hideMyPosition();
    currentBuildingFlag = true;
    window.location = "#homePage";
}

function toggleFavorite() {
    if (isFavorite(currentBuildingOrder)) {
        removeFavorite(currentBuildingOrder);
        $("#fav-building").removeClass("fa-star");
        $("#fav-building").addClass("fa-star-o");
    } else {
        addFavorite(currentBuildingOrder);
        $("#fav-building").removeClass("fa-star-o");
        $("#fav-building").addClass("fa-star");
    }
}

function setFavorite() {
    if (isFavorite(currentBuildingOrder)) {
        $("#fav-building").removeClass("fa-star-o");
        $("#fav-building").addClass("fa-star");
    } else {
        $("#fav-building").removeClass("fa-star");
        $("#fav-building").addClass("fa-star-o");
    }
}

function renderBuildingPage(buildingOrder) {
    hideMyPosition();
    currentBuildingOrder = buildingOrder;
    $(":mobile-pagecontainer").pagecontainer("change", "buildings.html", {
        changeHash: true
    });
}

$(document).on("pageshow", "#buildings", function (event) {
    var slider = $('.bxslider').bxSlider({
        autoControls: true
    });
    var fillss = "";

    $("#buildingName").html(buildings[currentBuildingOrder].name);
    $("#bximages").html("");

    for (j in buildings[currentBuildingOrder].img) {
        $("#bximages").append("<li><img src=" + buildings[currentBuildingOrder].img[j].url + "></li>");
    }

    slider.reloadSlider();
    $("#buildingAddress").html("<b>Address:</b>  " + buildings[currentBuildingOrder].address);
    $("#buildingDescription").html(buildings[currentBuildingOrder].description);
    $("#deleteFavoriteBuilding").html(fillss);
});

function hideMyPosition() {
    myPosition=[0, 0];
    markerMyPosition.setOpacity(0);
}

function setcurrentBuilding(id_building) {
    currentBuildingOrder = id_building;
}

function resetcurrentBuilding() {
    currentBuildingOrder = 999;
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    } else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function sortListFunction(buildingsJson) {
    var ordenationAux = [];
    for (var i = 0; i < buildingsJson.length; i++) {
        ordenationAux.push([buildingsJson[i].name, buildingsJson[i].order])
    }
    return ordenationAux.sort(sortFunction);
}

function saveBuilding(order) {
    if (order != null) {
        window.localStorage.setItem(order, buildings[order].name);
    }
    renderFavPage();
}

function isFavorite(order) {
    if (localStorage.getItem(order) == null) {
        return false;
    } else {
        return true;
    }
}

function addFavorite(order) {
    localStorage.setItem(order, buildings[order].name);
}

function removeFavorite(order) {
    localStorage.removeItem(order);
}

function getAllSavedBuildings() {
    var result = [];
    for (var key in localStorage) {
        result.push([key, localStorage.getItem(key)])
    }
    return result;
}

function renderFavPage() {
    favBuildingFlag = true;

    var favBuildings = getAllSavedBuildings();
    if (favBuildings.length == 0) {
        $("#listViewFavBuilding").html("No building added...");
    } else {
        var result = createListBuilding(favBuildings, 3);

        $("#listViewFavBuilding").html(result);
        $("#listViewFavBuilding").listview().listview('refresh');
    }
}

function deleteAllFavBuilding() {
    localStorage.clear();
    renderFavPage();
}

function toggleMarkers() {
    if (markersOpacity == 0) {
        markersOpacity = 1;
    } else {
        markersOpacity = 0;
    }
    for (var i = 1; i < markers.length; i++) {
        markers[i].setOpacity(markersOpacity);
    }
}

(function() {
    $(document).on("pageinit", "#homePage", function (e) {
        //prevent any bound defaults
        e.preventDefault();

        //loader function after deviceready event returns
        function onDeviceReady() {

            //handle button press for geolocation
            $("#getLocation").on("tap", function (e) {
                e.preventDefault();
                getLocation();
                $("#leftpanel").panel("close");
            })
        }
        //as deviceready returns load onDeviceReady()
        $(document).on("deviceready", onDeviceReady);
    });
})();

jQuery(document).ready(function () {
  setFavorite();
});
