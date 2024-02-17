const {
  sum,
  modulus,
  sayHelloTo,
  duplicateObject,
  addProduct,
} = require("./function");

test("should sum two numbers", () => {
  expect(sum(1, 3)).toBe(4);
});

test("should return the absolute value of a number", () => {
  expect(modulus(10)).toBe(10);
  expect(modulus(-10)).toBe(10);
});

test("should receive a string and return a phrase", () => {
  const name = "Test";
  expect(sayHelloTo(name)).toBe(`Hello, ${name}!`);
});

test("should receive an object and return its duplicate", () => {
  const obj = { name: "Test", password: 123 };
  const newObj = duplicateObject(obj);
  expect(newObj).toEqual(obj);
});

test("should add something to the array", () => {
  const cart = [];

  addProduct("One", cart);
  addProduct(1, cart);
  addProduct(true, cart);

  expect(cart).toContain("One");
  expect(cart).toContain(1);
  expect(cart).toContain(true);
});


