var subsManager = new SubsManager();

Router.configure({
  layoutTemplate: "layout"
});

Router.route('/', { name: 'home' });
HomeController = RouteController.extend({

  template: 'home',
  data: function () {
    return {
      services: Services.find()
    };
  },
  action: function () {
    this.render();
  }
});

Router.route('/service/:_id', { name: 'service' });
//noinspection JSUnusedGlobalSymbols
ServiceController = RouteController.extend({

  template: 'service',
  waitOn: function () {
    return [
      subsManager.subscribe('service', this.params._id),
      subsManager.subscribe('serviceTests', this.params._id)
    ];
  },
  data: function () {

    return {
      service: Services.findOne(this.params._id),
      tests: Tests.find({ serviceId: this.params._id })
    };
  },
  action: function () {
    this.render();
  }
});

Router.route('/test/:_id', { name: 'test' });
//noinspection JSUnusedGlobalSymbols
TestController = RouteController.extend({

  template: 'test',
  waitOn: function () {
    return [
      subsManager.subscribe('test', this.params._id),
      subsManager.subscribe('reports', this.params._id, false, 10)
    ];
  },
  data: function () {

    return {
      test: Tests.findOne(this.params._id),
      reports: Reports.find({
        testId: this.params._id,
        isPassing: false
      }, {
        sort: { createdAt: -1 },
        limit: 10
      })
    };
  },
  action: function () {
    this.render();
  }
});

Router.route('/report/:_id', { name: 'report' });
//noinspection JSUnusedGlobalSymbols
ReportController = RouteController.extend({

  template: 'report',
  waitOn: function () {
    return [
      subsManager.subscribe('report', this.params._id)
    ];
  },
  data: function () {

    return {
      report: Reports.findOne(this.params._id)
    };
  },
  action: function () {
    this.render();
  }
});

Router.route('/users', { name: 'users' });
UsersController = RouteController.extend({

  template: 'users',
  data: function () {
    return {
      users: Meteor.users.find()
    };
  },
  action: function () {
    this.render();
  }
});


Router.route('/user/:_id', { name: 'user' });
UserController = RouteController.extend({

  template: 'user',
  data: function () {
    return {
      user: Meteor.users.findOne(this.params._id)
    };
  },
  action: function () {
    this.render();
  }
});

// Ensure that user is logged in
Router.onBeforeAction(ensureLogin, {
  only: ['user']
});

function ensureLogin () {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    Router.go("/");
  }
  this.next();
}