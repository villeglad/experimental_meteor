// This code only runs on the server
// 
// Meteor publish definitions
Meteor.publish("tasks", function () {
    return Tasks.find({
        $or: [
            { private: {$ne: true} },
            { owner: this.userId }
        ]
    });
});