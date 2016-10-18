Meteor.methods({
  /** The method to add a new status. Receives the status text */
  'statuses.add' (status) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(status, String);
    Statuses.insert({ status });
  },

  /**
   * The method to remove a status. Receives the id of the status.
   * Also removes associated likes and comments.
   */
  'statuses.remove' (id) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(id, String);
    Statuses.remove({ _id: id, owner: this.userId });
    Likes.remove({ statusId: id });
    Comments.remove({ statusId: id });
  }
});
