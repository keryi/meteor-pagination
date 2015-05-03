Package.describe({
  name: 'keryi:meteor-paginate',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'A simple pagination for meteor',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

var both = ['server', 'client'];

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('coffeescript');
  api.use('templating', 'client');
  api.use('twbs:bootstrap@3.3.4');
  api.use('reactive-var@1.0.5');
  api.addFiles('pagination.js', both);
  api.export('Pagination');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('keryi:meteor-paginate');
  api.addFiles('meteor-paginate-tests.js', 'server');
  api.addFiles('test-data.js', both);
});
