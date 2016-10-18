Meteor.methods({
  /**
   * The method to cancel a friendship. Receives the id of the friend. Can 
   * be called by either user.
   */
  'friendships.cancel' (id) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(id, String);
    Friendships.remove({
      $and: [
        { friendship: { $in: [id] } },
        { friendship: { $in: [this.userId] } }
      ]
    });
  }
});
