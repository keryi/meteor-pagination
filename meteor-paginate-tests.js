Tinytest.add('paginate 10 per page', function(test) {
  test.equal(TestColl.find().count(), 100);
  var pagination = new Pagination(TestColl, {perPage: 10});

  // at page 0
  test.equal(pagination.currentPage().length, 10);
  test.equal(pagination.pageCount(), 10);
  test.isTrue(pagination.hasNext());
  test.isFalse(pagination.hasPrevious());
  test.equal(pagination.currentPage()[0].data, 'test#0');

  // go to page 1
  pagination.goNext();
  test.equal(pagination.currentIndex.get(), 1);
  test.isTrue(pagination.hasNext());
  test.isTrue(pagination.hasPrevious());
  test.equal(pagination.currentPage()[0].data, 'test#10');

  // go to page 0
  pagination.goPrevious();
  test.equal(pagination.currentIndex.get(), 0);
  test.isTrue(pagination.hasNext());
  test.isFalse(pagination.hasPrevious());

  // go to page before 0
  pagination.goPrevious();
  test.equal(pagination.currentIndex.get(), 0);
  test.isFalse(pagination.hasPrevious());

  // go to page beyond before 0
  _.times(5, function(i) {
    pagination.goPrevious();
    test.equal(pagination.currentIndex.get(), 0);
    test.isFalse(pagination.hasPrevious());
  });

  // go to page 8
  _.times(8, function(i) {
    pagination.goNext();
  });
  test.equal(pagination.currentIndex.get(), 8);
  test.isTrue(pagination.hasNext());

  // go to page 9
  pagination.goNext();
  test.equal(pagination.currentIndex.get(), 9);
  test.isFalse(pagination.hasNext());

  // try go to page 10, it should stay at 9
  pagination.goNext();
  test.equal(pagination.currentIndex.get(), 9);
  test.isFalse(pagination.hasNext());

  // try go beyond, it should stay at 9 as well
  _.times(5, function(i) {
    pagination.goNext();
  });
  test.equal(pagination.currentIndex.get(), 9);
  test.isFalse(pagination.hasNext());

  // go to 1st page
  pagination.goFirst();
  test.equal(pagination.currentIndex.get(), 0);
  test.isFalse(pagination.hasPrevious());
  test.equal(pagination.currentPage()[0].data, 'test#0');

  // go to last page
  pagination.goLast();
  test.equal(pagination.currentIndex.get(), 9);
  test.isFalse(pagination.hasNext());
  test.equal(pagination.currentPage()[0].data, 'test#90');

  // go to specific page
  pagination.goTo(1);
  test.equal(pagination.currentIndex.get(), 0);
  test.equal(pagination.currentPage()[0].data, 'test#0');
});
