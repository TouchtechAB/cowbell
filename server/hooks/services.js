// Collection wide options
Services.hookOptions.after.update = { fetchPrevious: true };

// Hooks
Services.after.update(function (userId, doc, fieldNames) {

  // Check if value of status has changed
  if (_.contains(fieldNames, "status") && doc.status !== this.previous.status) {
    onServiceStatusChanged(doc, this.previous.status, doc.status);
  }
});


// Handlers
function onServiceStatusChanged (service, oldValue, newValue) {
  console.log("[serviceId %s] Service status has changed from [%s] to [%s]",
    service._id, oldValue, newValue);

  if (newValue === "warning" || newValue === "error") {
    sendServiceStatus(service._id);
  }
}

function sendServiceStatus (serviceId) {

  var service = Services.findOne({ _id: serviceId });
  var tests = Tests.find({ serviceId: service._id, isPassing: false });

  // TODO make this more modular (Slack, Mandrill etc.)

  // Mandrill
  var subject = "Status alert - " + service.title;
  var title = "Service " + service.status;
  var message = "our web service <b>" + service.title +
    "</b> is in an unhealthy state.<br><br>Failing tests:";
  var failingTests = [];

  if (tests.count() > 0) {

    message += "<ul>";

    tests.forEach(function (test) {
      message += "<li>" + test.title + "</li>";
      failingTests.push(test.title);
    });

    message += "</ul>";
  }

  //noinspection Eslint
  var users = Meteor.users.find({ roles: { $in: ["admin"] }});
  users.forEach(function (user) {
    sendNotification(subject, title, message, user);
  });

  // Slack
  var slackMessage = "*" + service.title + "* is in an unhealthy state.";
  var url = "http://status.touchtech.com/service/" + service._id;

  sendSlackNotification("issue", slackMessage, {
    "Failing": failingTests,
    "Details": url
  });
}