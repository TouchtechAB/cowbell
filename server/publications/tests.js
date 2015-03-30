Meteor.publish("tests", function () {

    //if(!this.userId) return this.ready();

    return Tests.find({ },
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
    if(!_id) return this.ready();

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

Meteor.publish("testReports", function (testId, limit) {

    if(!this.userId || !testId || !limit) {
        return this.ready();
    }

    return Reports.find({ testId: testId },
        {
            limit: limit,
            sort: { createdAt: -1 },
            fields: {
                _id: 1,
                output: 1,
                isPassing: 1,
                testId: 1,
                createdAt: 1
            }
        });
});