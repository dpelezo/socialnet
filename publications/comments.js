/** Return comments made by the logged-in user */
Meteor.publish('userComments', function () {
  return Comments.find({ owner: this.userId });
});
