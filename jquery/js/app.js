/*
    script for the index.html page
    dependencies: jquery

    open weather API: 
    http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f
*/


// When the DOM content has been loaded:
$(function() {
    'use strict';
    $('a').attr('target', '_blank');
    $('article').hide().fadeIn(1000);
    $('#toggle-article').click(function() {
        $('article').toggle();
    });

    $.getJSON('http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f')
        .then(function(data) {
            var temperature = data.main.temp;
            $('#temp').text(Math.round(temperature));
    });

});








