Statuses = new Mongo.Collection('statuses');

let Schemas = {};

Schemas.Statuses = new SimpleSchema({
  status: { type: String },
  firstName: {
    type: String,
    autoValue: function () { return Meteor.user().profile.firstName; }
  },
  owner: {
    type: String,
    autoValue: function () {
      if (this.isInsert) { return this.userId; }
      else { this.unset(); }
    }
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) { return new Date(); }
      else { this.unset(); }
    }
  }
});

Statuses.attachSchema(Schemas.Statuses);
