/** Define the home route */
FlowRouter.route('/', {
  name: 'home',
  action () {
    BlazeLayout.render('fullLayout', { main: 'heroUnit' });
  }
});

/**
 * Check if a user is logged in to restrict access to signup and login
 */
let loggedInCheck = [
  () => { if (Meteor.userId()) { FlowRouter.go('dashboard'); } }
];

/** Define the signup route */
FlowRouter.route('/signup', {
  name: 'signup',
  action () {
    BlazeLayout.render('fullLayout', { main: 'signup' });
  },
  triggersEnter: loggedInCheck
});

/** Define the login route */
FlowRouter.route('/login', {
  name: 'login',
  action () {
    BlazeLayout.render('fullLayout', { main: 'login' });
  },
  triggersEnter: loggedInCheck
});

/**
 * Define the userRoutes group, in order to restrict access for users who
 * are not logged in
 */
let userRoutes = FlowRouter.group({
  prefix: '/user',
  name: 'userRoutes',
  triggersEnter: [
    () => { if (!Meteor.userId()) { FlowRouter.go('home'); } }
  ]
});

/** Define the dashboard route */
userRoutes.route('/dashboard', {
  name: 'dashboard',
  action () {
    BlazeLayout.render('mainLayout', {
      navigation: 'userNav',
      content: 'dashboard'
    });
  }
});

/** Define the find users route */
userRoutes.route('/findUsers', {
  name: 'findUsers',
  action () {
    BlazeLayout.render('mainLayout', {
      navigation: 'userNav',
      content: 'findUsers'
    });
  }
});

/** Define the edit user profile route */
userRoutes.route('/profile', {
  name: 'profile',
  action () {
    BlazeLayout.render('mainLayout', {
      navigation: 'userNav',
      content: 'userProfile'
    });
  }
});

/** Define the route to manage albums */
userRoutes.route('/albums', {
  name: 'albums',
  action () {
    BlazeLayout.render('mainLayout', {
      navigation: 'userNav',
      content: 'albums'
    });
  }
});

/** Define the route to upload photos */
userRoutes.route('/photos', {
  name: 'photos',
  action () {
    BlazeLayout.render('mainLayout', {
      navigation: 'userNav',
      content: 'photos'
    });
  }
});

/** Define the route to upload photos */
userRoutes.route('/photos/album/:name', {
  name: 'photosByAlbum',
  action () {
    BlazeLayout.render('mainLayout', {
      navigation: 'userNav',
      content: 'photosByAlbum'
    });
  }
});

/** Define the route to the activity page */
userRoutes.route('/activity', {
  name: 'activity',
  action () {
    BlazeLayout.render('mainLayout', {
      navigation: 'userNav',
      content: 'activity'
    });
  }
});

/** Define public route to view a user's profile */
FlowRouter.route('/public/profile/:username', {
  name: 'publicProfile',
  action () {
    BlazeLayout.render('fullLayout', { main: 'publicProfile' });
  }
});

/** Define public route to view a user's album */
FlowRouter.route('/public/:username/album/:name', {
  name: 'publicAlbum',
  action () {
    BlazeLayout.render('fullLayout', { main: 'publicAlbum' });
  }
});
