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

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});