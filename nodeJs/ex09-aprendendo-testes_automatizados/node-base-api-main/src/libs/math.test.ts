import { sum, sub, mult, div } from "./math";

describe("math", () => {
  it("should sum two numbers", () => {
    const result = sum(2, 2);
    expect(result).toBe(4);
  });

  it("should subtract two numbers", () => {
    const result = sub(5, 2);
    expect(result).toBe(3);
  });

  it("should multiply two numbers", () => {
    const result1 = mult(5, 2);
    expect(result1).toBe(10);

    const result2 = mult(5, 0);
    expect(result2).toBe(0);
  });

  it("should divide two numbers", () => {
    const result1 = div(9, 3);
    expect(result1).toBe(3);

    const result2 = div(9, 0);
    expect(result2).toBe(false);
  });
});
