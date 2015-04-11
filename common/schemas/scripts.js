/*
 Scripts
 */

Schemas.Script = new SimpleSchema({
  file: {
    type: String
  },
  path: {
    type: String,
    index: 1
  },
  hash: {
    type: String,
    index: 1
  },
  runnerId: {
    type: String,
    index: 1
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

Scripts.attachSchema(Schemas.Script);