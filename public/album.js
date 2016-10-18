Template.publicAlbum.onCreated(function () {
  let username  = FlowRouter.getParam('username'),
      albumName = FlowRouter.getParam('name');
  
  this.autorun(() => {
    this.subscribe('public.getAlbumPhotos', username, albumName);
  });
});

Template.publicAlbum.helpers({
  'username' () { return FlowRouter.getParam('username'); },
  'albumName' () { return FlowRouter.getParam('name'); },
  'photos' () { return Images.find(); }
});
