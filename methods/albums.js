Meteor.methods({
  /** The method to save a new album. Receives the album name */
  'albums.add' (album) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(album, String);
    Albums.insert({ name: album });
  },
  
  /** The method to remove an album. Receives the album id */
  'albums.remove' (albumId) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(albumId, String);
    Albums.remove({ _id: albumId, owner: this.userId });
  },
  
  /**
   * The method to toggle the status of an album. Receives the album id and 
   * the new status.
   */
  'albums.toggleStatus' (albumId, status) {
    if (!this.userId) { throw new Meteor.Error(401, 'You must be logged in'); }
    check(albumId, String);
    check(status, Boolean);
    Albums.update({ _id: albumId }, { $set: { isPublic: status } });
  }
});
