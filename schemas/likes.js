Likes = new Mongo.Collection('likes');

let Schemas = {};

Schemas.Likes = new SimpleSchema({
  owner: {
    type: String,
    autoValue: function () { return this.userId; }
  },
  firstName: {
    type: String,
    autoValue: function () { return Meteor.user().profile.firstName; }
  },
  statusId: { type: String },
  createdAt: {
    type: Date,
    autoValue: function () { return new Date(); }
  }
});

Likes.attachSchema(Schemas.Likes);
