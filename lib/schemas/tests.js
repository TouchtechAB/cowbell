/*
 Tests
 */

Schemas.Test = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 160
  },
  serviceId: {
    type: String,
    index: 1
  },
  scriptId: {
    type: String,
    index: 1
  },
  isPassing: {
    type: Boolean,
    index: 1,
    defaultValue: false
  },
  isCritical: {
    type: Boolean,
    index: 1,
    defaultValue: false
  },
  interval: {
    type: Number
  },
  lastRunAt: {
    type: Date,
    optional: true
  },
  nextRunAt: {
    type: Date,
    autoValue: function () {

      // Updates
      if (this.isUpdate) {

        if (this.field('interval').isSet || this.field('lastRunAt').isSet) {

          var interval;
          var lastRunAt;
          var test = Tests.findOne({ _id: this.docId });

          // Resolve interval
          if (this.field('interval').value) {
            interval = this.field('interval').value;
          }
          else {
            interval = test.interval;
          }

          // Resolve lastRunAt
          if (this.field('lastRunAt').value) {
            lastRunAt = this.field('lastRunAt').value;
          }
          else {
            lastRunAt = test.lastRunAt;
          }

          // Set nextRunAt
          return { $set: moment(lastRunAt).add(interval, 'minutes').toDate() };
        }
        else {
          return { $set: new Date };
        }
      }

      // Upserts
      else if (this.isUpsert) {
        return { $setOnInsert: new Date };
      }

      // Inserts
      else {
        return new Date;
      }
    }
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date };
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      return new Date;
    }
  }
});

Tests.attachSchema(Schemas.Test);