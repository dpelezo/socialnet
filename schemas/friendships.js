Friendships = new Mongo.Collection('friendships');

let Schemas = {};

Schemas.Friendships = new SimpleSchema({
  friendName1: { type: String },
  friendName2: { type: String },
  owner: {
    type: String,
    autoValue: function () { return this.userId; }
  },
  friendship: { type: [String] },
  createdAt: {
    type: Date,
    autoValue: function () { return new Date(); }
  }
});

Friendships.attachSchema(Schemas.Friendships);
