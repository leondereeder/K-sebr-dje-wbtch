function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 36.5699064,
            lng: 75.9628949
        },
        zoom: 3
    });
	
	var icons = {
        Koleon: {
            name: 'Koleon',
            icon: 'img/marker-koleon.png'
        },
        Cpu: {
            name: 'Cpu',
            icon: 'img/marker-cpu.png'
        },
        Gpu: {
            name: 'Gpu',
            icon: 'img/marker-gpu.png'
        },
        Ram: {
            name: 'Ram',
            icon: 'img/marker-ram.png'
        }

    };

	var features = [{
        position: new google.maps.LatLng(28.6466772, 76.8130646),
        type: 'Cpu',
        title: "CPU",
        content: '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">CPU</h1>' +
            '<div id="bodyContent">' +
            '<p>Dit is een van onze belangrijkste leveranciers voor CPUs</p>' +
            '</div>' +
            '</div>'
    }, {
        position: new google.maps.LatLng(13.7244426, 100.3529064),
        type: 'Gpu',
        title: "GPU",
        content: 'Info over de cpu'
    }, {
        position: new google.maps.LatLng(24.6822124, 121.7564334, 14),
        type: 'Ram',
        title: "RAM",
        content: 'Info over de cpu'
    }, {
        position: new google.maps.LatLng(52.0873639, 5.1631756, 17),
        type: 'Koleon',
        title: "Koleon",
        content: 'Info over de cpu'
    }, {
        position: new google.maps.LatLng(30.567816, 114.0201867, 10),
        type: 'Cpu',
        title: 'CPU',
        content: 'Info over de cpu'
    }, {
        position: new google.maps.LatLng(30.117174, 120.1193385, 10),
        type: 'Gpu',
        title: 'GPU',
        content: 'Info over de cpu'
    }, {
        position: new google.maps.LatLng(34.527839, 133.5255459, 12),
        type: 'Ram',
        title: 'RAM',
        content: 'Info over de cpu'
    }, {
        position: new google.maps.LatLng(37.7109818, 126.2959495, 8),
        type: 'Cpu',
        title: 'CPU',
        content: 'Info over de cpu'
    }];
	
	var markers = new Array();
	         
	var i = 0;
    function addMarker(feature) {
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map,
            title: feature.title
        });
        marker.addListener('click', function() {
            var infowindow = new google.maps.InfoWindow({
                content: feature.content
            });
            infowindow.open(map, marker);
        });
		markers.push(marker);
    }

	for (var i = 0, feature; feature = features[i]; i++) {
        addMarker(feature);
    }
	
	var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'img/markers/m'});


    var legend = document.getElementById('legend');
    for (var key in icons) {
        var type = icons[key];
        var name = type.name;
        var icon = type.icon;
        var div = document.createElement('div');
        div.innerHTML = '<img src="' + icon + '"> ' + name;
        legend.appendChild(div);
    }

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

}