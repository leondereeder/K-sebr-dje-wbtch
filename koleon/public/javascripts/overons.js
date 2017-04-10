/*
	This Javascript file is used on the overons.jade page. It was made for assignment 2 and features the googlemap
*/
// Google Maps' initialize function
function initMap() {
    // Define a new map
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 36.5699064,
            lng: 75.9628949
        },
        zoom: 3
    });

    // Define icons based on name of the feature
    var icons = {
        Koleon: {
            name: 'Koleon',
            icon: 'images/marker-koleon.png'
        },
        Cpu: {
            name: 'Cpu',
            icon: 'images/marker-cpu.png'
        },
        Gpu: {
            name: 'Gpu',
            icon: 'images/marker-gpu.png'
        },
        Ram: {
            name: 'Ram',
            icon: 'images/marker-ram.png'
        },
        Distribution1: {
            name: 'Plane',
            icon: 'images/marker-plane.png'
        },
        Ups: {
            name: 'Ups',
            icon: 'images/marker-ups.png'
        }
    };

    // Define features, positions, type for the markers, titles and content for the infowindow event
    var features = [{
        position: new google.maps.LatLng(28.6466772, 76.8130646),
        type: 'Cpu',
        title: "CPU",
        content: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3>CPU</h3>' +
            '<div id="bodyContent">' +
            '<p>Dit is een van onze belangrijkste leveranciers voor de Intel i3 en i5 processoren.</p>' +
            '</div>' +
            '</div>'
    }, {
        position: new google.maps.LatLng(13.7244426, 100.3529064),
        type: 'Gpu',
        title: "GPU",
        content: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3>GPU</h3>' +
            '<div id="bodyContent">' +
            '<p>Dit is een van onze belangrijkste leveranciers voor onze Nvidea videokaarten. Hier worden de 1080 en 1070 kaarten geproduceerd.</p>' +
            '</div>' +
            '</div>'
    }, {
        position: new google.maps.LatLng(24.6822124, 121.7564334, 14),
        type: 'Ram',
        title: "RAM",
        content: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3>Werkgeheugen</h3>' +
            '<div id="bodyContent">' +
            '<p>In Taiwan wordt ons Jawkill DDR4 werkgeheugen geproduceerd.</p>' +
            '</div>' +
            '</div>'
    }, {
        position: new google.maps.LatLng(52.0873639, 5.1631756, 17),
        type: 'Koleon',
        title: "Koleon",
        content: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3>CPU</h3>' +
            '<div id="bodyContent">' +
            '<p>Hier worden de laptopts geassembleerd en verzonden. Tevens is het hoofdkwartier van Koleon gevestigd.</p>' +
            '</div>' +
            '</div>'
    }, {
        position: new google.maps.LatLng(30.567816, 114.0201867, 10),
        type: 'Cpu',
        title: 'CPU',
        content: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3>CPU</h3>' +
            '<div id="bodyContent">' +
            '<p>Dit is een van onze belangrijkste leveranciers voor de intel I7 processoren.</p>' +
            '</div>' +
            '</div>'
    }, {
        position: new google.maps.LatLng(30.117174, 120.1193385, 10),
        type: 'Gpu',
        title: 'GPU',
        content: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3>GPU</h3>' +
            '<div id="bodyContent">' +
            '<p>Hier wordt de Nvidea 1080 en 900- serie geproduceerd. </p>' +
            '</div>' +
            '</div>'
    }, {
        position: new google.maps.LatLng(34.527839, 133.5255459, 12),
        type: 'Ram',
        title: 'RAM',
        content: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3>RAM</h3>' +
            '<div id="bodyContent">' +
            '<p>Hier wordt het DDR3 RAM geproduceerd dat nog in enkele oudere laptops in onze voorraad aanwezig is.</p>' +
            '</div>' +
            '</div>'
    }, {
        position: new google.maps.LatLng(38.740167, 125.416148, 8),
        type: 'Cpu',
        title: 'CPU',
        content: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3>CPU</h3>' +
            '<div id="bodyContent">' +
            '<p>Onze AMD processoren worden hier geproduceerd met behulp van Noord-Koreaanse kinderarbeid zodat we ze zo goedkoop mogelijk aan de consument aan kunnen bieden.</p>' +
            '</div>' +
            '</div>'
    }, {
        position: new google.maps.LatLng(52.308477, 4.761560, 17),
        type: 'Distribution1',
        title: 'Koleon distributie',
        content: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3>Distributie</h3>' +
            '<div id="bodyContent">' +
            '<p>Onze internationale verzendingen buiten Nederland en het Europese vasteland worden gedistributeerd vanaf Schiphol.</p>' +
            '</div>' +
            '</div>'
    }, {
        position: new google.maps.LatLng(52.083104, 5.182438, 17),
        type: 'Ups',
        title: 'Koleon distributie',
        content: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3>Distributie</h3>' +
            '<div id="bodyContent">' +
            '<p>Onze verzendingen binnen Nederland en het Europese vasteland worden gedistributeerd vanaf Utrecht door UPS.</p>' +
            '</div>' +
            '</div>'
    }, {
        position: new google.maps.LatLng(39.859996, -75.252336, 17),
        type: 'Ups',
        title: 'Koleon distributie',
        content: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3>Distributie</h3>' +
            '<div id="bodyContent">' +
            '<p>Onze verzendingen naar Amerika worden verder gedistributeerd vanaf Philadelphia airport door UPS.</p>' +
            '</div>' +
            '</div>'
    }];

    // Create an array of all the markers for the Clustermarkerer
    var markers = new Array();

    // Function to add specific marker to the map
    function addMarker(feature) {
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map,
            title: feature.title
        });
        // Add listener to each marker
        marker.addListener('click', function () {
            var infowindow = new google.maps.InfoWindow({
                content: feature.content
            });
            infowindow.open(map, marker);
        });
        // Push marker to the array of all markers
        markers.push(marker);
    }

    // Add all markers to the map
    for (var i = 0, feature; feature = features[i]; i++) {
        addMarker(feature);
    }

    // Markerclusterer based on array of all markers
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'images/markers/m'
    });

    // Add legend to the map
    var legend = document.getElementById('legend');
    for (var key in icons) {
        var type = icons[key];
        var name = type.name;
        var icon = type.icon;
        var div = document.createElement('div');
        div.innerHTML = '<img src="' + icon + '"> ' + name;
        legend.appendChild(div);
    }

    // Push legend to the map
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

}