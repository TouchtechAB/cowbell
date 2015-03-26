Template.topBar.events({
    'click #navbar-logout': function(event, template){

        event.preventDefault();
        Meteor.logout(function(err){
            if(err) console.log(err);
            Router.go("/");
        });
    }
});