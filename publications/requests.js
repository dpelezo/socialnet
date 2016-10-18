/** Return requests either made by or made to the logged-in user */
Meteor.publish('requests', function () {
  return Requests.find({ $or: [
    { requesterId: this.userId },
    { targetId: this.userId }
  ] });
});
