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
	
	var script = document.createElement('script');
	script.src = 'js/Mapdata.geojsonp';
	document.getElementsByTagName("head")[0].appendChild(script);
	
	var markers = new Array();
	window.eqfeed_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
          var coords = results.features[i].position;
		  addMarker(results.features[i]);
        }
      }
	         
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
		markers[i] = new google.maps.Marker({
            position: feature.position,
            label: feature.title
          });
		  i++;
		  alert(markers);
    }

	var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'img/markers'});


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