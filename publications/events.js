/** Return all events targeted at the logged-in user */
Meteor.publish('events', function () {
  return Events.find({ targetId: this.userId });
});
