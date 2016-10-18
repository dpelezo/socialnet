Events = new Mongo.Collection('events');

let Schemas = {};

Schemas.Events = new SimpleSchema({
  owner: {
    type: String,
    autoValue: function () { return this.userId; }
  },
  targetId: { type: String }
});

Events.attachSchema(Schemas.Events);
