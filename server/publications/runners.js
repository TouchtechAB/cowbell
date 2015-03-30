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