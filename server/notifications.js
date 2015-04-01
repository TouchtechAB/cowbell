sendNotification = function(subject, title, message, user) {

    var toEmail = user.emails[0].address;
    var firstName = user.profile && user.profile.firstName ? user.profile.firstName : null;
    var toName = firstName ? firstName : null;

    Meteor.Mandrill.sendTemplate({
        "template_name": Meteor.settings.notifications.mandrill.template,
        "template_content": [{ }],
        "message": {
            "global_merge_vars": [
                {
                    "name": "firstName",
                    "content": firstName
                },
                {
                    "name": "title",
                    "content": title
                },
                {
                    "name": "message",
                    "content": message
                }
            ],
            subject: subject,
            from_email: Meteor.settings.notifications.mandrill.from_email,
            from_name: Meteor.settings.notifications.mandrill.from_name,
            to: [{
                email: toEmail,
                name: toName,
                type: "to"
            }],
            headers: {
                "Reply-To": Meteor.settings.notifications.mandrill.from_email
            },
            metadata: {
                website: process.env.ROOT_URL
            }
        }
    });
};

sendSlackNotification = function(type, message, data) {

    var slackBravo = slack.extend({
        channel: Meteor.settings.notifications.slack.channel,
        icon_url: Meteor.settings.notifications.slack.icon,
        username: Meteor.settings.notifications.slack.username
    });

    var shouts = Meteor.settings.notifications.slack.shouts[type] ? Meteor.settings.notifications.slack.shouts[type] : [];
    var shout = shouts[_.random(0, shouts.length - 1)];

    var text = shout + " " + message;
    var payload = data ? data : {};

    slackBravo({ text: text, fields: payload });
};