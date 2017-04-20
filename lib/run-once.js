module.exports = runOnce;

function runOnce(asyncFn) {
  var queue = [];
  var results;

  function worker(next) {
    if (results) {
      return next.apply(null, results);
    }

    queue.push(next);

    if (queue.length === 1) {
      asyncFn(function() {
        results = arguments;
        queue.forEach(worker);
        queue = undefined;
      });
    }
  }

  return worker;
}
