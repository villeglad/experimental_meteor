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
