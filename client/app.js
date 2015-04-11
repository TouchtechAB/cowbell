var subsManager = new SubsManager();

subsManager.subscribe("users");
subsManager.subscribe("services");
subsManager.subscribe("runners");
subsManager.subscribe("scripts");

Meteor.startup(function () {
  Avatar.options = {
    fallbackType: "initials"
  };
});