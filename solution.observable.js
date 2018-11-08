const { curry, identity } = require("./fp.utils")
const { replaceFizzBuzz } = require("./solution.array")

const Observable = valuesProducer => {
  return {
    subscribe: valuesProducer
  }
}

Observable.create = valuesProducer => Observable(valuesProducer)

const range$ = Observable.create(observer => {
  let i = 0
  const id = setInterval(() => observer.next(i++), 1000)
  return () => clearInterval(id)
})

const map = curry((f, xs) => {
  return Observable.create(observer => {
    return xs.subscribe({
      next: x => observer.next(f(x)),
      error: e => observer.error(e),
      completed: () => observer.completed()
    })
  })
})

const handler = {
  next: x => console.log("nex:--->", x),
  error: x => console.log("error:--->"),
  completed: () => console.log("______________________")
}

map(replaceFizzBuzz, range$).subscribe(handler)
