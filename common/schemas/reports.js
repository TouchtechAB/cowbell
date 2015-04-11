/*
 Reports
 */

Schemas.Report = new SimpleSchema({
  testId: {
    type: String,
    label: "Test Id",
    index: 1
  },
  isPassing: {
    type: Boolean,
    index: 1
  },
  output: {
    type: String
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

Reports.attachSchema(Schemas.Report);