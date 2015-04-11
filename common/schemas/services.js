/*
 Services
 */

Schemas.Service = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 160
  },
  status: {
    type: String,
    index: 1,
    defaultValue: "normal",
    allowedValues: [ "error", "warning", "normal" ]
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

Services.attachSchema(Schemas.Service);