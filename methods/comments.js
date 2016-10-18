Meteor.methods({
  /**
   * The method to add a new comment. Receives the status id and the comment
   * text
   */ 
  'comments.add' (statusId, comment) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(statusId, String);
    check(comment, String);
    Comments.insert({ comment, statusId });
  },
  
  /** The method to remove a comment. Receives the comment id */
  'comments.remove' (commentId) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(commentId, String);
    Comments.remove({ _id: commentId });
  }
});
