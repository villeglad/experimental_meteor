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

        Meteor.call("addTask", text);

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

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});