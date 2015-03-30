var subsManager = new SubsManager();

Tracker.autorun(function() {
    var userId = Meteor.userId();
    subsManager.subscribe("users");
    subsManager.subscribe("services");
    subsManager.subscribe("runners");
    subsManager.subscribe("scripts");
});

Meteor.startup(function() {
    Avatar.options = {
        fallbackType: "initials"
    };
});