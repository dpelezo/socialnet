/** Return the profile image of the logged-in user */
Meteor.publish('profileImage', function () {
  return Images.find({ owner: this.userId, isProfileImage: { $exists: true } });
});
