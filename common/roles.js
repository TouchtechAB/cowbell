isAdmin = function(userId) {
    if(!userId) {
        return false;
    }
    var user = Meteor.users.findOne(userId);
    return user && user.roles && _.indexOf(user.roles, 'admin') !== -1;
};

isTeam = function(userId) {
    if(!userId) {
        return false;
    }
    var user = Meteor.users.findOne(userId);
    return user && user.roles && _.indexOf(user.roles, 'team') !== -1;
};

isContributor = function(userId) {
    if(!userId) {
        return false;
    }
    var user = Meteor.users.findOne(userId);
    return user && user.roles && _.indexOf(user.roles, 'contributor') !== -1;
};