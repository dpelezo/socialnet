/** Return all statuses of the logged-in user */
Meteor.publish('userStatuses', function () {
  return Statuses.find({ owner: this.userId });
});
