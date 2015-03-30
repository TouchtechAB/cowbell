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
