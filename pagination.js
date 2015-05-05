Pagination = function(Coll, options) {
  this.Coll = Coll;
  this.perPage = options.perPage;
  this.currentIndex = new ReactiveVar(0);
};

Pagination.prototype.itemCount = function() {
  return this.Coll.find().count();
};

Pagination.prototype.itemCount = function() {
  return this.Coll.find().count();
};

Pagination.prototype.pageCount = function() {
  return Math.ceil(this.itemCount() / this.perPage);
};

Pagination.prototype.currentPage = function() {
  var startIndex = this.currentIndex.get() * this.perPage;
  var endIndex = this.hasNext() ?
    this.itemCount() - 1 : startIndex + this.perPage;
  return this.Coll.find({}, {limit: (this.currentIndex.get() + 1) * this.perPage})
    .fetch().slice(startIndex, endIndex);
};

Pagination.prototype.hasNext = function() {
  return this.currentIndex.get() < this.pageCount() - 1;
};

Pagination.prototype.hasPrevious = function() {
  return this.currentIndex.get() > 0;
};

Pagination.prototype.goNext = function() {
  if (this.hasNext()) {
    this.currentIndex.set(this.currentIndex.get() + 1);
  }
};

Pagination.prototype.goPrevious = function() {
  if (this.hasPrevious()) {
    this.currentIndex.set(this.currentIndex.get() - 1);
  }
};

Pagination.prototype.goFirst = function() {
  this.currentIndex.set(0);
};

Pagination.prototype.goLast = function() {
  this.currentIndex.set(this.pageCount() - 1);
};

Pagination.prototype.goTo = function(pageNum) {
  pageIndex = pageNum - 1; // we start at 0
  if (pageIndex <= this.pageCount()) {
    this.currentIndex.set(pageIndex);
  }
}
