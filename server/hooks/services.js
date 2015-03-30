// Collection wide options
Services.hookOptions.after.update = { fetchPrevious: true };

// Hooks
Services.after.update(function (userId, doc, fieldNames, modifier, options) {

    // Check if value of status has changed
    if(_.contains(fieldNames, "status") && doc.status !== this.previous.status) {
        onServiceStatusChanged(doc, this.previous.status, doc.status);
    }
});


// Handlers
function onServiceStatusChanged(service, oldValue, newValue) {
    console.log("[serviceId %s] Service status has changed from [%s] to [%s]", service._id, oldValue, newValue);

    if(newValue === "warning" || newValue === "error") {
        sendServiceStatus(service._id);
    }
}

function sendServiceStatus(serviceId) {

    var service = Services.findOne({ _id: serviceId });
    var failingTests = Tests.find({ serviceId: service._id, isPassing: false });
    var subject = "Status alert - " + service.title;
    var title = "Service " + service.status;
    var message = "our web service <b>" + service.title + "</b> is in an unhealthy state.<br><br>Failing tests:";

    if(failingTests.count() > 0) {
        message += "<ul>";
        failingTests.forEach(function(failingTest){
            message += "<li>" + failingTest.title + "</li>";
        });
        message += "</ul>";
    }

    var users = Meteor.users.find({ roles: { $in: ["admin", "team", "contributors"] }});
    users.forEach(function(user){
        sendNotification(subject, title, message, user);
    });
}