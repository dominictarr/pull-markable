var pull = require('pull-stream')

module.exports = pull.Through(function markable(read) {
  var seen = [], marked = false, head = 0, ended

  function readable (abort, cb) {
    if(abort)
      return read(abort, cb)

    if(marked && head < seen.length) {
      return cb(null, seen[head++])
    } else if (ended)
      return cb(ended)
    else
      read(null, function (end, data) {
        if(!marked) return cb(end, data)
        if(end)
          ended = ended || end
        else {
          seen.push(data)
          head = seen.length
        }
        cb(end, data)
      })
  }

  readable.mark = function () {
    var mark = head
    //return a function that allows the user
    //to return the stream to a given start point.
    marked = true
    return function revert () {
      head = mark
    }
  }

  return readable
})
