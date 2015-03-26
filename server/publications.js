Meteor.publish("tests", function (limit) {

    if(!this.userId) return this.ready();
    if(!limit) return this.ready();

    return Tests.find({ },
        {
            limit: limit,
            fields: {
                _id: 1,
                title: 1,
                runner: 1,
                lastRunAt: 1,
                nextRunAt: 1,
                interval: 1,
                isPassing: 1,
                isCritical: 1
            }
        });
});

Meteor.publish("test", function (_id) {

    if(!this.userId) return this.ready();
    if(!_id) return this.ready();

    return Tests.find({ _id: _id },
        {
            limit: 1,
            fields: {
                _id: 1,
                title: 1,
                runner: 1,
                lastRunAt: 1,
                nextRunAt: 1,
                interval: 1,
                isPassing: 1,
                isCritical: 1
            }
        });
});

Meteor.publish("services", function (limit) {

    //if(!this.userId) return this.ready();
    if(!limit) return this.ready();

    return Services.find({ },
        {
            limit: limit,
            fields: {
                _id: 1,
                title: 1,
                status: 1
            }
        });
});

Meteor.publish("service", function (_id) {

    //if(!this.userId) return this.ready();
    if(!_id) return this.ready();

    return Services.find({ _id: _id },
        {
            limit: 1,
            fields: {
                _id: 1,
                title: 1,
                status: 1
            }
        });
});

Meteor.publish("serviceTests", function (serviceId) {
    if(!this.userId || !serviceId) {
        return this.ready();
    }
    return Tests.find({ serviceId: serviceId });
});

Meteor.publish("testReports", function (testId) {
    if(!this.userId || !testId) {
        return this.ready();
    }
    return Reports.find({ testId: testId },
        {
            sort: { createdAt: -1 }
        });
});

Meteor.publish("testFile", function (testId) {
    if(!this.userId || !testId) {
        return this.ready();
    }
    return TestFiles.find({ testId: testId },
        {
            limit: 1,
            sort: { uploadedAt: -1 }
        });
});

Meteor.publish("reports", function (limit) {

    if(!this.userId) return this.ready();
    if(!limit) return this.ready();

    return Reports.find({ },
        {
            limit: limit,
            fields: {
                _id: 1,
                title: 1,
                status: 1
            }
        });
});

Meteor.publish("report", function (_id) {

    if(!this.userId) return this.ready();
    if(!_id) return this.ready();

    return Reports.find({ _id: _id },
        {
            limit: 1,
            fields: {
                _id: 1,
                title: 1,
                status: 1
            }
        });
});

Meteor.publish("users", function() {
    return Meteor.users.find({}, {
        fields: {
            _id: 1,
            emails: 1,
            profile: 1,
            roles: 1
        }});
});