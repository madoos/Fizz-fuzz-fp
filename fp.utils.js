const curry = f =>
  function curried(...args) {
    return args.length >= f.length
      ? f(...args)
      : (...rest) => curried(...args, ...rest)
  }

const identity = x => x

const _compose2 = (f, g) => x => f(g(x))

const compose = (...fns) => fns.reduce(_compose2, identity)

const flip = f => (...args) => f(...args.reverse())

const pipe = flip(compose)

const always = x => () => x

const both = (p1, p2) => x => p1(x) && p2(x)

const and = (...ps) => ps.reduce(both, always(true))

const map = curry((f, xs) => {
  const mapped = []

  xs.forEach(item => {
    mapped.push(f(item))
  })

  return mapped
})

module.exports = {
  compose,
  identity,
  curry,
  flip,
  pipe,
  always,
  map,
  both,
  and
}
