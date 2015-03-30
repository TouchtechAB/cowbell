
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
                isCritical: 1,
                serviceId: 1
            }
        });
});