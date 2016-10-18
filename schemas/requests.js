Requests = new Mongo.Collection('requests');

let Schemas = {};

Schemas.Requests = new SimpleSchema({
  requesterId: {
    type: String,
    autoValue: function () { return this.userId; }
  },
  requesterName: {
    type: String,
    autoValue: function () { return Meteor.user().profile.fullName; }
  },
  targetId:   { type: String },
  targetName: { type: String }
});

Requests.attachSchema(Schemas.Requests);
