var Schemas = {};

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

// TODO Attach to users collection