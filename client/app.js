
Tracker.autorun(function() {
    var userId = Meteor.userId();
    Meteor.subscribe("users");
    Meteor.subscribe("tests");
    Meteor.subscribe("services");
    Meteor.subscribe("runners");
    Meteor.subscribe("scripts");
    Meteor.subscribe("reports", 10);
});

Meteor.startup(function() {
    Avatar.options = {
        fallbackType: "initials"
    };
});

Session.set("Mongol", {
    'collections': ['Services', 'Tests', 'Runners', 'Scripts'],
    'display': true,
    'opacity_normal': ".7",
    'opacity_expand': ".9"
});