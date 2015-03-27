var Schemas = {};

/*
Tests
 */

Schemas.Test = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 160
    },
    serviceId: {
        type: String,
        index: 1
    },
    scriptId: {
        type: String
    },
    isPassing: {
        type: Boolean,
        index: 1,
        defaultValue: false
    },
    isCritical: {
        type: Boolean,
        index: 1,
        defaultValue: false
    },
    interval: {
        type: Number
    },
    lastRunAt: {
        type: Date,
        optional: true
    },
    nextRunAt: {
        type: Date,
        autoValue: function() {

            // Updates
            if(this.isUpdate){

                if (this.field('interval').isSet || this.field('lastRunAt').isSet) {

                    var interval;
                    var lastRunAt;
                    var test = Tests.findOne({_id: this.docId});

                    // Resolve interval
                    if (this.field('interval').value) {
                        interval = this.field('interval').value;
                    }
                    else {
                        interval = test.interval;
                    }

                    // Resolve lastRunAt
                    if (this.field('lastRunAt').value) {
                        lastRunAt = this.field('lastRunAt').value;
                    }
                    else {
                        lastRunAt = test.lastRunAt;
                    }

                    // Set nextRunAt
                    return { $set: moment(lastRunAt).add(interval, 'minutes').toDate() };
                }
                else {
                    return { $set: new Date };
                }
            }

            // Upserts
            else if (this.isUpsert) {
                return { $setOnInsert: new Date };
            }

            // Inserts
            else {
                return new Date;
            }
        }
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();
            }
        }
    },
    updatedAt: {
        type: Date,
        autoValue: function() {
            return new Date;
        }
    }
});

Tests.attachSchema(Schemas.Test);


/*
 Scripts
 */

Schemas.Script = new SimpleSchema({
    file: {
        type: String
    },
    path: {
        type: String
    },
    hash : {
        type: String
    },
    runnerId : {
        type: String
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();
            }
        }
    },
    updatedAt: {
        type: Date,
        autoValue: function() {
            return new Date;
        }
    }
});

Scripts.attachSchema(Schemas.Script);


/*
 Runners
 */

Schemas.Runner = new SimpleSchema({
    title: {
        type: String
    },
    slug: {
        type: String
    },
    command: {
        type: String
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();
            }
        }
    },
    updatedAt: {
        type: Date,
        autoValue: function() {
            return new Date;
        }
    }
});

Runners.attachSchema(Schemas.Runner);


/*
 Services
 */

Schemas.Service = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 160
    },
    status: {
        type: String,
        index: 1,
        defaultValue: "normal"
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();
            }
        }
    },
    updatedAt: {
        type: Date,
        autoValue: function() {
            return new Date;
        }
    }
});

Services.attachSchema(Schemas.Service);

/*
 Reports
 */

Schemas.Report = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 160
    },
    testId: {
        type: String,
        label: "Test Id",
        index: 1
    },
    status: {
        type: String,
        index: 1
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();
            }
        }
    },
    updatedAt: {
        type: Date,
        autoValue: function() {
            return new Date;
        }
    }
});

Reports.attachSchema(Schemas.Report);

/*
  Users
 */

Schemas.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        regEx: /^[a-zA-ZäöüÄÖÜßéèÉÈåÅ]{2,25}$/
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-ZäöüÄÖÜßéèÉÈåÅ]{2,25}$/
    },
    organization : {
        type: String,
        regEx: /^[a-z0-9A-z .]{3,30}$/,
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    countryCode: {
        type: String,
        regEx: /^[A-Z]{2}$/,
        optional: true
    }
});

Schemas.User = new SimpleSchema({
    emails: {
        type: [Object]
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schemas.UserProfile
    },
    statistics: {
        type: Object,
        optional: true
    },
    "statistics.duration": {
        type: Number,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: [String],
        optional: true
    }
});