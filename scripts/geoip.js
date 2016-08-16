function renewMap(coordinate){
  var mapObj = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 18,
    center: coordinate,
  });
  return mapObj;
}

function getJSON(url){
  var Httpreq = new XMLHttpRequest(); // Init a request
  Httpreq.open("GET", url,false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function getCoordinate(ip){
  var json_str = getJSON("http://freegeoip.net/json/" + ip); // Send request to freegeoip to get json string -> hence parse it to a json object;
  var json = JSON.parse(json_str);
  var coordinate = {lat: json.latitude, lng: json.longitude};
  return coordinate;
}

function getMarker(hop){
  var coordinate = getCoordinate(hop);
  var marker = new google.maps.Marker({
    position: coordinate,
    animation: google.maps.Animation.DROP,
  });
  return marker;
}

function plot(ip, map){
  var marker = getMarker(ip, map);
  marker.setMap(map);
  map.setCenter(marker.getPosition());
  marker.addListener('click', function() {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    var json_str = getJSON("http://freegeoip.net/json/" + ip);
    var json = JSON.parse(json_str);
    json_str = getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + json.latitude + "," + json.longitude + "&sensor=true");
    var address_json = JSON.parse(json_str);
    var contentString = '<div id="content">' +
                    '<h1>' + json.ip + '</h1>' +
                    '<div id="bodycontent">' +
                    '<p>Country Code: ' + json.country_code + '</p>'+
                    '<p>Country: ' + json.country_name + '</p>' +
                    '<p>Region Code: ' + json.region_code + '</p>' +
                    '<p>Region Name: ' + json.region_name + '</p>' +
                    '<p>City: ' + json.city + '</p>' +
                    '<p>Suburb: ' + address_json.results[0].address_components[2].long_name + '</p>' +
                    '<p>Street Info: ' + address_json.results[0].address_components[0].long_name + " " + address_json.results[0].address_components[1].long_name + '</p>' +
                    '<p>Zip Code: ' + json.zip_code + '</p>' +
                    '<p>Time Zone: ' + json.time_zone + '</p>' +
                    '<p>Latitude: ' + json.latitude + '</p>' +
                    '<p>Longitude: ' + json.longitude + '</p>' +
                    '<p>Metro Code: ' + json.metro_code + '</p>' +
                    '</div>' +
                  '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    infowindow.open(map, marker);
  });
}
