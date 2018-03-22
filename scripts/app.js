// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function () {
  console.log("Let's get coding!");
  // CODE IN HERE!

  initMap();

  $.ajax({
    method: 'GET',
    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson',
    dataType: 'json',
    success: (response) => renderPage(response)
  });

  function renderPage(quakeData) {
    quakeData.features.forEach(quake => {
      let props = quake.properties;
      // let time = (Date.now() - props.time) / 3600000;
      let quakeEl = `<p>M ${props.mag} - ${props.place} / ${parseInt((Date.now() - props.time) / 3600000)} hours ago</p>` //  <p>M 4.2 - 1km ESE of Fontana, California / 123 hours ago </p>
      $('#info').append(quakeEl);

      let coords = quake.geometry.coordinates;
      let latLng = new google.maps.LatLng(coords[1], coords[0]);
      let icon = {
        url: './images/earthquake.png',
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      };
      let marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: icon
      });

    });
  }

  var map;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 37.78,
        lng: -122.44
      },
      zoom: 4
    });
  }

});