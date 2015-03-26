trimWhitespace = function (string) {
    if (!string) return null;
    return string.replace(/^\s*|\s*$/g, "");
};

capitalizeString = function (string) {
    if (!string) return null;
    return string.charAt(0).toUpperCase() + string.substring(1);
};

lowerCaseString = function (string) {
    if (!string) return null;
    return string.toLowerCase();
};

isUserEmailVerified = function (userId){
    if (!userId) return false;

    var user = Meteor.users.findOne({_id: userId});
    var isVerified = false;
    if(user && user.emails.length) {
        user.emails.forEach(function(email){
            if(email.verified){
                isVerified = true;
            }
        });
    }
    return isVerified;
};

findUserByEmail = function(email){
    if (!email) return null;
    return Meteor.users.findOne({ emails: { $elemMatch: { address: email }}});
};

getUserEmails = function(userId){
    var emails = [];
    var user = Meteor.users.findOne(userId);
    if(user) {
        user.emails.forEach(function(email){
           emails.push(email.address);
        });
    }
    return emails;
};

isUserEmail = function(userId, email) {
    if(!email || !userId) return false;
    return getUserEmails(userId).indexOf(email) !== -1;
};

splitEmail = function(email) {
    if (!email) return null;
    return email.split("@")[0];
};