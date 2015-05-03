Pagination = function(Coll, options) {
  this.Coll = Coll;
  this.perPage = options.perPage;
  this.currentIndex = new ReactiveVar(0);
  this.itemCount = function() {
    return this.Coll.find().count();
  };
  this.pageCount = function() {
    return Math.ceil(this.itemCount() / this.perPage);
  };
  this.currentPage = function() {
    var startIndex = this.currentIndex.get() * this.perPage;
    var endIndex = this.hasNext() ?
      this.itemCount() - 1 : startIndex + this.perPage;
    return this.Coll.find({}, {limit: (this.currentIndex.get() + 1) * this.perPage})
      .fetch().slice(startIndex, endIndex);
  };
  this.hasNext = function() {
    return this.currentIndex.get() < this.pageCount() - 1;
  };
  this.hasPrevious = function() {
    return this.currentIndex.get() > 0;
  };
  this.goNext = function() {
    if (this.hasNext()) {
      this.currentIndex.set(this.currentIndex.get() + 1);
    }
  };
  this.goPrevious = function() {
    if (this.hasPrevious()) {
      this.currentIndex.set(this.currentIndex.get() - 1);
    }
  };
  this.goFirst = function() {
    this.currentIndex.set(0);
  };
  this.goLast = function() {
    this.currentIndex.set(this.pageCount() - 1);
  };
};
