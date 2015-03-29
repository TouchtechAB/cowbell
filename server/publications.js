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
                isCritical: 1
            }
        });
});

Meteor.publish("runners", function () {

    //if(!this.userId) return this.ready();

    return Runners.find({ },
        {
            fields: {
                _id: 1,
                title: 1,
                slug: 1,
                command: 1
            }
        });
});

Meteor.publish("scripts", function () {

    //if(!this.userId) return this.ready();

    return Scripts.find({ },
        {
            fields: {
                _id: 1,
                file: 1,
                path: 1,
                runnerId: 1
            }
        });
});

Meteor.publish("services", function () {

    //if(!this.userId) return this.ready();

    return Services.find({ },
        {
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

    if(!serviceId) {
        return this.ready();
    }

    return Tests.find({ serviceId: serviceId },
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
                testId: 1
            }
        });
});

Meteor.publish("reports", function (limit) {

    if(!this.userId) return this.ready();
    if(!limit) return this.ready();

    return Reports.find({ },
        {
            limit: limit,
            sort: { createdAt: -1 },
            fields: {
                _id: 1,
                output: 1,
                isPassing: 1,
                testId: 1
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
                output: 1,
                isPassing: 1,
                testId: 1
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