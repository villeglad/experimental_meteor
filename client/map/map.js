Template.map.onRendered(function () {
    //leaflet
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
    var map = L.map('map', {
        center: [0,0],
        zoom: 13
    });

    // Locate the user and set the map position
    map.locate({
        setView: true,
        maxZoom: 12
    });
    
    map.spin(true)
    Session.set("location", map.getCenter());
    var tileLayer = L.tileLayer.provider('OpenStreetMap.BlackAndWhite').addTo(map);
    tileLayer.on("load", function() {map.spin(false)});
    map.doubleClickZoom.disable();

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
