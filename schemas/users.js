let Schemas = {};

Schemas.Meta = new SimpleSchema({
  isPublicProfile: {
    type: Boolean,
    autoValue: function () {
      if (this.isInsert) { return false; }
    }
  },
  primaryEmail: { type: String, optional: true },
  profileImage: { type: String, optional: true },
  signedUpOn: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) { return new Date(); }
      else { this.unset(); }
    }
  }
});

Schemas.UserProfile = new SimpleSchema({
  firstName:    { type: String },
  lastName:     { type: String },
  fullName:     { type: String, optional: true },
  gender:       { type: String, allowedValues: ['male', 'female'] },
  dayOfBirth:   { type: String },
  monthOfBirth: { type: String },
  yearOfBirth:  { type: String },
  birthday:     { type: Date, optional: true },
  location:     { type: String, optional: true },
  meta:         { type: Schemas.Meta, optional: true }
});

Schemas.Users = new SimpleSchema({
  username:            { type: String },
  profile:             { type: Schemas.UserProfile, optional: true },
  emails:              { type: Array },
  "emails.$":          { type: Object },
  "emails.$.address":  { type: String, regEx: SimpleSchema.RegEx.Email },
  "emails.$.verified": { type: Boolean },
  services:            { type: Object, optional: true, blackbox: true },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) { return new Date(); }
      else { this.unset(); }
    }
  }
});

Meteor.users.attachSchema(Schemas.Users);
