# pull-markable

A pull-stream that you can mark, read ahead, and
then jump back to the marked point.

Used in [regular-stream]
(https://github.com/dominictarr/regular-stream)

## Example

``` js
var markable = require('pull-markable')

var read = pull.values([1, 2, 3]).pipe(markable)

var revert = read.mark()

read(null, function (end, data) {
  console.log(data) //=> 1
   //data = 1
  read(null, function (end, data) {
    console.log(data) //=> 2
    //revert takes us back to 1!
    revert()
    read(null, function (end, data) {
      console.log(data) //=> 1 !
    })
  })
})

```

## todo

release old marks, and probably also capture groups.

## License

MIT
