Meteor.methods({
  /** The method to add a new status. Receives the status id */
  'likes.add' (statusId) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(statusId, String);
    Likes.insert({ statusId });
  },
  
  /** The method to remove a status. Receives the status id */
  'likes.remove' (statusId) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(statusId, String);
    Likes.remove({ statusId, owner: this.userId });
  }
});
