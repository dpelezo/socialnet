Template.addStatus.onCreated(() => {
  /** Initialize the error session variable */
  Session.set('error', '');
});

Template.addStatus.events({
  'submit form' (event) {
    event.preventDefault();
    let status = event.target.status.value;
    
    if (!_.isEmpty(status)) {
      Meteor.call('statuses.add', status);
      event.target.status.value = '';
      Session.set('error', '');
    } else {
      Session.set('error', 'The status cannot be blank');
    }
  }
});

Template.addStatus.helpers({
  /**
   * Check to see if we have an error, and if we do return a message
   */
  'haveErrors' () {
    if (Session.get('error')) { return Session.get('error'); }
  }
});
