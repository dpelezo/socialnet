/** Return all albums created by the logged-in user */
Meteor.publish('albums', function () {
  return Albums.find({ owner: this.userId });
});
