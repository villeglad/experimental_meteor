Meteor.subscribe("tasks");



Template.body.helpers({
    tasks: function() {
        if (Session.get("hideCompleted")) {
            return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
        } else {
            return Tasks.find({}, {sort: {createdAt: -1}})
        }
        return Tasks.find({}, {sort: {createdAt: -1}});
    },

    hideCompleted: function () {
        return Session.get("hideCompleted");
    },
    incompleteCount: function() {
        return Tasks.find({checked: {$ne: true}}).count();
    },

});

Template.body.events({
    "submit .new-task": function (event) {
        event.preventDefault();

        var text = event.target.text.value;

        Meteor.call("addTask", text, Session.get("coordinates"));

        //clear form
        event.target.text.value = "";
    },
    "change .hide-completed input": function (event) {
        Session.set("hideCompleted", event.target.checked);
    }
});

Template.task.helpers({
    isOwner: function () {
        return this.owner === Meteor.userId();
    },
    locString: function() {
        return JSON.stringify(this.latlng);
    }
});

Template.task.events({
    "click .toggle-checked": function () {
        //set checked prop to opposite of current value
        Meteor.call("setChecked", this._id, ! this.checked);
    },
    "click .delete": function () {
        Meteor.call("deleteTask", this._id);           
    },
    "click .toggle-private": function() {
        Meteor.call("setPrivate", this._id, ! this.private);
    }

});

Template.map.rendered = function() {
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
    map.on("dblclick", function(e) {
        Session.set("coordinates", e.latlng);
    })
    Session.set("location", map.getCenter());
    L.tileLayer.provider('OpenStreetMap.BlackAndWhite').addTo(map);
    map.doubleClickZoom.disable();

    var markers = Tasks.find({}, {sort: {createdAt: -1}}); //change to find where latlng is set
    console.log(markers);

    markers.forEach(function(marker) {
        console.log(marker.latlng);
        if (marker.latlng != 'undefined') {
            var marker = L.marker(marker.latlng).addTo(map);
        }
        
    });
    //observe task creation => add marker to map
    markers.observe({
        added: function (document) {
          var marker = L.marker(document.latlng).addTo(map)
        }
    });
    
}

Template.map.helpers({
    location: function () {
        return JSON.stringify(Session.get("coordinates"));
    }
});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});