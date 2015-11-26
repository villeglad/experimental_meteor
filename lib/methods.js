//Meteor methods

Meteor.methods({
    addTask: function(text) {
        if(! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Tasks.insert({
            text: text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    },

    deleteTask: function(taskId) {
        //find task
        var task = Tasks.findOne(taskId);
        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        //delete task
        Tasks.remove(taskId);
    },

    setChecked: function (taskId, setChecked) {
        if (task.private && task.owner !== Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Tasks.update(taskId, { $set: { checked: setChecked} });
    },

    setPrivate: function (taskId, setToPrivate) {
        var task = Tasks.findOne(taskId);
        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Tasks.update(taskId, { $set: { private: setToPrivate} });
    }
  
});