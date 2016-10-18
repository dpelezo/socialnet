Comments = new Mongo.Collection('comments');

let Schemas = {};

Schemas.Comments = new SimpleSchema({
  owner: {
    type: String,
    autoValue: function () { return this.userId; }
  },
  firstName: {
    type: String,
    autoValue: function () { return Meteor.user().profile.firstName; }
  },
  comment:  { type: String },
  statusId: { type: String },
  createdAt: {
    type: Date,
    autoValue: function () { return new Date(); }
  }
});

Comments.attachSchema(Schemas.Comments);
