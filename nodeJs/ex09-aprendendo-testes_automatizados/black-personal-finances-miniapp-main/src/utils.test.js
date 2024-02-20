const { isValidDecimal } = require("./utils");

describe("utils", () => {
  it("should return true if the number is an integer", () => {
    expect(isValidDecimal(10)).toBe(true);
  });
  it("should to return true if a number has a decimal place", () => {
    expect(isValidDecimal(6.2)).toBe(true);
  });
  it("should return true if the number has two decimal places", () => {
    expect(isValidDecimal(3.14)).toBe(true);
  });
  it("should return false for numbers with more than two decimal places", () => {
    expect(isValidDecimal(1.414)).toBe(false);
    expect(isValidDecimal(57.3915)).toBe(false);
  });
});
