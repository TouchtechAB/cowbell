// Collection wide options
Tests.hookOptions.after.update = { fetchPrevious: true };

// Hooks
Tests.after.insert(function (userId, doc) {
  onTestInserted(doc);
});

Tests.after.remove(function (userId, doc) {
  onTestRemoved(doc);
});

Tests.after.update(function (userId, doc, fieldNames) {

  // Check if value of isPassing has changed
  if (_.contains(fieldNames, "isPassing") &&
    doc.isPassing !== this.previous.isPassing) {

    onTestIsPassingChanged(doc, this['previous'].isPassing, doc.isPassing);
  }

  // Check if value of isCritical has changed
  if (_.contains(fieldNames, "isCritical") &&
    doc.isCritical !== this.previous.isCritical) {

    onTestIsCriticalChanged(doc, this['previous'].isCritical, doc.isCritical);
  }
});

// Handlers
function onTestInserted (test) {
  console.log("[testId %s] Test has been inserted", test._id);
  updateServiceStatus(test.serviceId);
}

function onTestRemoved (test) {
  console.log("[testId %s] Test has been removed", test._id);
  updateServiceStatus(test.serviceId);
}

function onTestIsPassingChanged (test, oldValue, newValue) {

  console.log("[testId %s] isPassing changed from [%s] to [%s]",
    test._id, oldValue, newValue);

  updateServiceStatus(test.serviceId);
}

function onTestIsCriticalChanged (test, oldValue, newValue) {

  console.log("[testId %s] isCritical changed from [%s] to [%s]",
    test._id, oldValue, newValue);

  updateServiceStatus(test.serviceId);
}

function updateServiceStatus (serviceId) {

  var status;

  // Aggregate results of all tests for this service
  var pipeline = [
    { $match: { serviceId: serviceId }},
    { $group: {
      _id: { isPassing: "$isPassing", isCritical: "$isCritical" },
      count: { $sum: 1 }}
    },
    { $sort: { "_id.isPassing": 1, "_id.isCritical": -1 }}
  ];

  var testResults = Tests.aggregate(pipeline);

  if (!testResults.length) {
    console.log("No tests for service [%s]", serviceId);
    return;
  }

  // Evaluate the worst test result
  var worstTest = testResults[0]._id;
  if (!worstTest.isPassing && worstTest.isCritical) {
    status = "error";
  }
  else if (!worstTest.isPassing && !worstTest.isCritical) {
    status = "warning";
  }
  else {
    status = "normal";
  }

  // Update service status
  Services.update({ _id: serviceId }, { $set: { status: status }});
}