
Meteor.startup(function() {

    Meteor.Mandrill.config({
        username: Meteor.settings.mandrill.username,
        key: Meteor.settings.mandrill.key
    });

    ensureTests();
    console.log(TestFilesNew);
});

function ensureTests() {

    var tests = Tests.find({ nextRunAt: { $lt: new Date }});
    tests.forEach(function(test){
        runTest(test._id);
    });

    Meteor.setTimeout(ensureTests, 10000);
}
