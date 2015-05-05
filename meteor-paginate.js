Template.paginate.helpers({
  pages: function() {
    return _.range(1, this.pageCount() + 1);
  },

  isCurrentPage: function() {
    return Session.get('currentPageNum') == this;
  }
});

Template.paginate.rendered = function() {
  Session.set('currentPageNum', 1);
}

Template.paginate.events({
  'click .go-to-page': function(e, t) {
    var pageNum = $(e.currentTarget).data('pagenum');
    Session.set('currentPageNum', pageNum);
    t.data.pagination.goTo(pageNum);
  },

  'click .go-next': function(e, t) {
    t.data.pagination.goNext();
    Session.set('currentPageNum', t.data.pagination.currentIndex.get() + 1);
  },

  'click .go-previous': function(e, t) {
    t.data.pagination.goPrevious();
    Session.set('currentPageNum', t.data.pagination.currentIndex.get() + 1);
  }
});
