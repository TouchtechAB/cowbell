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