var Schemas = {};

/*
 Runners
 */

Schemas.Runner = new SimpleSchema({
    title: {
        type: String
    },
    slug: {
        type: String,
        index: 1
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