
Tracker.autorun(function() {
    var userId = Meteor.userId();
    Meteor.subscribe("users");
    Meteor.subscribe("tests", 500);
    Meteor.subscribe("services", 500);
});

Meteor.startup(function() {
    Avatar.options = {
        fallbackType: "initials"
    };
});

Session.set("Mongol", {
    'collections': ['Services', 'Tests'],
    'display': true,
    'opacity_normal': ".7",
    'opacity_expand': ".9"
});