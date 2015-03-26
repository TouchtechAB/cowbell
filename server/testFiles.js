TestFilesNew = loadTestFiles();

function loadTestFiles(){
    var fs = Meteor.npmRequire('fs');

    var runners = [
        { _id: "casperjs", name: "CasperJS", command: "casperjso test" },
        { _id: "mocha", name: "Mocha", command: "mocha" }
    ];

    var testFiles = [];
    runners.forEach(function(runner) {

        try {
            var dir = fs.realpathSync('./assets/app/tests/' + runner._id);
            fs.readdirSync(dir).forEach(function(file) {

                testFiles.push({
                    runner: runner._id,
                    name: file,
                    path: dir + "/" + file
                });
            });
        }
        catch(err) {
            console.log("Cannot read %s tests folder", runner.name);
        }
    });

    return testFiles;
}