TestFiles = new FS.Collection("testFiles", {
    filter: {
        maxSize: 104857600, //in bytes
        allow: {
            extensions: ['js'],
            contentTypes: ['text/javascript']
        },
        onInvalid: function (message) {
            if (Meteor.isClient) {
                alert(message);
            } else {
                console.log(message);
            }
        }
    },
    stores: [
        new FS.Store.FileSystem("local")
    ]
});