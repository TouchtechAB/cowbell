Meteor.publish("report", function (_id) {

    //if(!this.userId) return this.ready();
    if(!_id) return this.ready();

    return Reports.find({ _id: _id },
        {
            limit: 1,
            fields: {
                _id: 1,
                output: 1,
                isPassing: 1,
                testId: 1,
                createdAt: 1
            }
        });
});

Meteor.publish("reports", function (testId, isPassing, limit) {

    if(!testId || !limit) {
        return this.ready();
    }

    return Reports.find({ testId: testId, isPassing: isPassing },
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