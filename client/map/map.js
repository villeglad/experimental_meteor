Template.map.onRendered(function () {
    //leaflet
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
    

    
    
    //map.spin(true)
    
    var osmBw = L.tileLayer.provider('OpenStreetMap.BlackAndWhite');
    var baseLayers = {
        "OSM BW": osmBw
    };

   //tileLayer.on("load", function() {map.spin(false)});
    
    //create map
    var map = L.map('map', {
        center: [0,0],
        zoom: 13,
        layers: [osmBw]
    });

    // Locate the user and set the map position
    map.locate({
        setView: true,
        maxZoom: 12
    });

    map.doubleClickZoom.disable();

    // Add the layer control
    L.control.layers(baseLayers).addTo(map);

    var markers = Tasks.find({}, {sort: {createdAt: -1}}); //change to find where latlng is set

    //observe markers
    markers.observe({
        added: function (m) {
            var marker = L.marker(m.latlng).bindPopup(m.text).addTo(map)
        }
    });

    //map events
    

    map.on("dblclick", function(e) {
        Session.set("coordinates", e.latlng);
    })
    
});

Template.map.helpers({
    location: function () {
        return JSON.stringify(Session.get("coordinates"));
    }
});
