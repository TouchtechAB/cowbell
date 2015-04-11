var slideout;

Template.layout.rendered = function () {

  console.log("Layout rendered");
  slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 256,
    'tolerance': 70
  });
};

Template.layout.events({
  'click #slideout-toggle-button': function onToggleSlideout (event) {
    event.preventDefault();

    if (slideout) {
      console.log("Toggle Slideout");
      slideout.toggle();
    }
  }
});