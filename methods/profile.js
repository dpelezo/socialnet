Meteor.methods({
  /**
   * Update the profile of a user. Receives an updates object with the new data
   */
  'profile.update' (updates) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(updates, Object);
    
    // Check if username is available
    if (Meteor.users.findOne({ username: updates.username })) {
      throw new Meteor.Error(403, `${updates.username} is already taken`);
    }
    
    Meteor.users.update({ _id: this.userId }, {
      $set: {
        "profile.firstName": updates.firstName,
        "profile.lastName": updates.lastName,
        "profile.birthday": updates.birthday,
        "profile.location": updates.location,
        "profile.meta.isPublicProfile": updates.isPublicProfile,
        "username": updates.username
      }
    });
    
    if (!_.isEmpty(updates.username)) {
      Images.update(
        { owner: this.userId },
        { $set: { username: updates.username } },
        { multi: true }
      );
      
      Albums.update(
        { owner: this.userId },
        { $set: { username: updates.username } },
        { multi: true }
      );
    }
    
    if (!_.isEmpty(updates.firstName) && !_.isEmpty(updates.lastName)) {
      Meteor.users.update({ _id: this.userId }, {
        $set: {
          "profile.fullName": `${updates.firstName} ${updates.lastName}`
        }
      });
    }
  },
  
  /**
   * Add new email to a user. Receives the new email parameter. Check on the 
   * server if the value is not already registered
   */
  'profile.addEmail' (newEmail) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(newEmail, String);
    
    if (!this.isSimulation) {
      if (Meteor.users.findOne({ _id: this.userId, "emails.address": { $in: [newEmail] } })) {
        throw new Meteor.Error(403, `You already have ${newEmail} registered`);
      }
      
      Meteor.users.update({ _id: this.userId }, {
        $push: {
          emails: {
            address: newEmail,
            verified: false
          }
        }
      });
    }
  },
  
  /** 
   * The method to set an email address as the primary email. Receives the 
   * email address.
   */
  'profile.makePrimary' (address) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(address, String);
    
    Meteor.users.update({ _id: this.userId }, {
      $set: {
        "profile.meta.primaryEmail": address
      }
    });
  },
  
  /** The method to remove an email. Receives the email adress */
  'profile.removeEmail' (address) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(address, String);
    
    Meteor.users.update({ _id: this.userId }, {
      $pull: {
        emails: {
          address: address
        }
      }
    });
  }
});
