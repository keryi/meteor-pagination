Meteor.startup(function() {
  TestColl = new Mongo.Collection('test_coll');
  if (TestColl.find().count() == 0) {
    _.times(100, function(i) {
      TestColl.insert({data: 'test#'+i});
    });
  }
});
