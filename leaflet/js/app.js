/*
    script file for index.html
    dependencies: leaflet, jquery

    Open Street Maps tile layer URL template:
    http://{s}.tile.osm.org/{z}/{x}/{y}.png

    attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
*/

$(function() {
    'use strict';

    function createMap(loc, zoom) {
        var map = L.map('map').setView(loc, zoom);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.circleMarker(loc).addTo(map);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            createMap([pos.coords.latitude, pos.coords.longitude], 14)
        }, function() {
            createMap([47.6, -122.33], 12);
        });
    } else {
        createMap([47.6, -122.33], 12);
    }
})