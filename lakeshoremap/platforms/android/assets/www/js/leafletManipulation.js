


  var markersOpacity = 1;

  // size of the loyola map PICTURE
  var mapWidth = 1350;
  var mapHeight = 2144;
  // 999 indica q nenhum popup teve que ser aberto
  var currentBuildingId = 999;
  var myPosition=[0,0];
  var markerMyPosition;
  var markers = [];
  var map;
  var favBuildingFlag = false;



    var x1_pixel = 165,
      y1_pixel = 2003,
      x2_pixel = 1208,
      y2_pixel = 123,
      lat1_leaf = -250,
      long1_leaf = 20,
      lat2_leaf = -15,
      long2_leaf = 150;  

  // function to convert pixels to leaflet units
  function pixel2leaflet(x,y){

    var alpha_x = (long2_leaf-long1_leaf)/(x2_pixel-x1_pixel);
    var alpha_y = (lat2_leaf-lat1_leaf)/(y2_pixel-y1_pixel);
    return [(alpha_y*(y-y1_pixel)+lat1_leaf),(alpha_x*(x-x1_pixel)+long1_leaf)]

  }
  // function to convert from gps coordinates to leaflet units
  function coord2leaflet(x,y){
    // calibration
    var lat1_google = 41.994599,
        long1_google = -87.660353,
        lat2_google = 42.001569,
        long2_google = -87.658586,
        lat1_leaf2 = -251,
        long1_leaf2 = 28,
        lat2_leaf2 = -55,
        long2_leaf2 = 68;

    var alpha_long_google = (long2_leaf2-long1_leaf2)/(long2_google-long1_google);
    var alpha_lat_google = (lat2_leaf2-lat1_leaf2)/(lat2_google-lat1_google);


    return [(alpha_lat_google*(x-lat1_google)+lat1_leaf2 ),(alpha_long_google*(y-long1_google)+long1_leaf2 )]
  }