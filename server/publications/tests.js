Meteor.publish("tests", function () {

  //if(!this.userId) return this.ready();

  return Tests.find({},
    {
      fields: {
        _id: 1,
        title: 1,
        scriptId: 1,
        lastRunAt: 1,
        nextRunAt: 1,
        interval: 1,
        isPassing: 1,
        isCritical: 1
      }
    });
});

Meteor.publish("test", function (_id) {

  //if(!this.userId) return this.ready();
  if (!_id) return this.ready();

  return Tests.find({ _id: _id },
    {
      limit: 1,
      fields: {
        _id: 1,
        title: 1,
        scriptId: 1,
        lastRunAt: 1,
        nextRunAt: 1,
        interval: 1,
        isPassing: 1,
        isCritical: 1,
        serviceId: 1
      }
    });
});