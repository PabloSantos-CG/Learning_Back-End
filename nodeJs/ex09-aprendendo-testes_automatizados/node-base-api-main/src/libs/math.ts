export const sum = (n1: number, n2: number) => {
  return n1 + n2;
};
export const sub = (n1: number, n2: number) => {
  return n1 - n2;
};
export const mult = (n1: number, n2: number) => {
  return n1 * n2;
};
export const div = (dividend: number, divisor: number) => {
  return divisor ? dividend / divisor : false;
};