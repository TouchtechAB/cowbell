AutoForm.addHooks(null, {

    before: {
        insert: function(doc) {
            console.log(doc);
            return doc;
            //return doc; (synchronous)
            //return false; (synchronous, cancel)
            //this.result(doc); (asynchronous)
            //this.result(false); (asynchronous, cancel)
        },
        /*
        update: function(modifier) {
            //return modifier; (synchronous)
            //return false; (synchronous, cancel)
            //this.result(modifier); (asynchronous)
            //this.result(false); (asynchronous, cancel)
        },
        */
        method: function(doc) {
            console.log(doc);
            return doc;
            //return doc; (synchronous)
            //return false; (synchronous, cancel)
            //this.result(doc); (asynchronous)
            //this.result(false); (asynchronous, cancel)
        }
    },

    // The same as the callbacks you would normally provide when calling
    // collection.insert, collection.update, or Meteor.call
    after: {
        insert: function(err, res) {
            if(err) {
                console.log(err);
            }
            if(res){
                console.log(res);
            }
        },
        update: function(err, res) {
            if(err) {
                console.log(err);
            }
            if(res){
                console.log(res);
            }
        },
        method: function(err, res) {
            if(err) {
                console.log(err);
            }
            if(res){
                console.log(res);
            }
        }
    },

    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
        console.log("Form success");
    },

    // Called when any submit operation fails
    onError: function(formType, error) {
        console.log(error);
    },

    // Called at the beginning and end of submission, respectively.
    // This is the place to disable/enable buttons or the form,
    // show/hide a "Please wait" message, etc. If these hooks are
    // not defined, then by default the submit button is disabled
    // during submission.
    beginSubmit: function() {
        console.log("Form begin submit");
    },
    endSubmit: function() {
        console.log("Form end submit");
    }
});