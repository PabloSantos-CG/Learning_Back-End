// function.js

exports.sum = (a, b) => {
  return a + b
}

exports.modulus = (x) => {
  return x < 0 ? -x : x
}

exports.sayHelloTo = (name) => {
  return `Hello, ${name}!`
}

exports.duplicateObject = (obj) => {
  return { ...obj }
}

exports.addProduct = (product, cart) => {
  cart.push(product)
}