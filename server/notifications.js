sendNotification = function(subject, message, user) {

    var toEmail = user.emails[0].address;
    var toName = user.profile.firstName;
    var firstName = user.profile.firstName;

    Meteor.Mandrill.sendTemplate({
        "template_name": Meteor.settings.mandrill.template,
        "template_content": [{ }],
        "message": {
            "global_merge_vars": [
                {
                    "name": "firstName",
                    "content": firstName
                },
                {
                    "name": "message",
                    "content": message
                }
            ],
            subject: subject,
            from_email: Meteor.settings.mandrill.from_email,
            from_name: Meteor.settings.mandrill.from_name,
            to: [{
                email: toEmail,
                name: toName,
                type: "to"
            }],
            headers: {
                "Reply-To": Meteor.settings.mandrill.from_email
            },
            metadata: {
                website: process.env.ROOT_URL
            }
        }
    });
};