const { curry, pipe, always, map } = require("./fp.utils")

const replaceWhen = curry((predicate, replacement, value) => {
  return predicate(value) ? replacement : value
})

const both = (p1, p2) => x => p1(x) && p2(x)

const isDivBy3 = n => n % 3 === 0
const isDivBy5 = n => n % 5 === 0
const isDivBy3And5 = both(isDivBy3, isDivBy5)

const replaceFizzBuzz = pipe(
  replaceWhen(isDivBy3And5, "fizzBuzz"),
  replaceWhen(isDivBy3, "fizz"),
  replaceWhen(isDivBy5, "buzz")
)

const fizzBuzz = map(replaceFizzBuzz)

const range = (start, end) =>
  Array.from({
    length: end - start
  }).map((_, i) => i + start)

module.exports = {
  replaceFizzBuzz
}
