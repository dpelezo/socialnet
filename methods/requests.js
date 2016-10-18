Meteor.methods({
  /** 
   * The method to add a new request. Receives the id and full name of the 
   * target user.
   */
  'requests.add' (targetId, targetName) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(targetId, String);
    check(targetName, String);
    Requests.insert({ targetId, targetName });
    Events.insert({ targetId });
  },
  
  /**
   * The method to cancel a request. Receives the type of request, and an id
   */
  'requests.cancel' (type, id) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(type, String);
    check(id, String);
    
    switch (type) {
      case 'userHasSent':
        Requests.remove({ requesterId: this.userId, targetId: id });
        Events.remove({ owner: this.userId, targetId: id });
        break;
      case 'userHasReceived':
        Requests.remove({ requesterId: id, targetId: this.userId });
        Events.remove({ owner: id, targetId: this.userId });
        break;
      default:
        console.log("Something went wrong");
        break;
    }
  },
  
  /**
   * The method to confirm a friend request. Receives the id and full name of 
   * the user who requested the friendship.
   */
  'requests.confirm' (id, fullName) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(id, String);
    check(fullName, String);
    
    Requests.remove({ requesterId: id, targetId: this.userId });
    Events.remove({ owner: id, targetId: this.userId });
    Friendships.insert({
      friendName1: Meteor.user().profile.fullName,
      friendName2: fullName,
      friendship: [this.userId, id]
    });
  }
});
