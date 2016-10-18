Albums = new Mongo.Collection('albums');

let Schemas = {};

Schemas.Albums = new SimpleSchema({
  owner: {
    type: String,
    autoValue: function () {
      if (this.isInsert) { return this.userId; }
      else { this.unset(); }
    }
  },
  username: {
    type: String,
    autoValue: function () {
      if (this.isInsert) { return Meteor.user().username; }
    }
  },
  name: { type: String },
  isPublic: {
    type: Boolean,
    autoValue: function () {
      if (this.isInsert) { return false; }
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

Albums.attachSchema(Schemas.Albums);
