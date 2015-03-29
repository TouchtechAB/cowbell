sendNotification = function(subject, title, message, user) {

    var toEmail = user.emails[0].address;
    var firstName = user.profile && user.profile.firstName ? user.profile.firstName : null;
    var toName = firstName ? firstName : null;

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
                    "name": "title",
                    "content": title
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