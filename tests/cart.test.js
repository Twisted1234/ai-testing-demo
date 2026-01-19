// tests/cart.test.js
// Jest unit tests for calculateTotal in src/cart.js

const calculateTotal = require('../src/cart');

describe('calculateTotal', () => {
  // 1. Should return 0 when price is falsy
  test('returns 0 when price is 0', () => {
    expect(calculateTotal(0, 3)).toBe(0);
  });

  // 2. Should return 0 when quantity is falsy
  test('returns 0 when quantity is 0', () => {
    expect(calculateTotal(15, 0)).toBe(0);
  });

  // 3. Should multiply price * quantity without discount for quantity <= 5
  test('calculates without discount when quantity is 5', () => {
    expect(calculateTotal(10, 5)).toBe(50);
  });

  // 4. Should apply 10% discount when quantity > 5
  test('applies 10% discount when quantity is 6', () => {
    expect(calculateTotal(10, 6)).toBe(54); // 10*6*0.9
  });

  // 5. Should handle decimal price correctly with discount
  test('handles decimal prices with discount', () => {
    expect(calculateTotal(19.99, 6)).toBeCloseTo(19.99 * 6 * 0.9, 5);
  });

  // 6. Should handle decimal price correctly without discount
  test('handles decimal prices without discount', () => {
    expect(calculateTotal(19.99, 5)).toBeCloseTo(19.99 * 5, 5);
  });

  // 7. Should treat negative quantity as eligible for discount rule (>5) logic — here quantity is -1 (edge), expect multiplication as written
  test('handles negative quantity by simple multiplication (no discount)', () => {
    expect(calculateTotal(10, -1)).toBe(-10);
  });

  // 8. Should handle negative price consistently
  test('handles negative price by simple multiplication (no discount)', () => {
    expect(calculateTotal(-10, 2)).toBe(-20);
  });

  // 9. Should not apply discount when quantity is exactly 5
  test('no discount at boundary quantity 5', () => {
    expect(calculateTotal(100, 5)).toBe(500);
  });

  // 10. Should apply discount when quantity is 6 (boundary just above)
  test('discount at boundary quantity 6', () => {
    expect(calculateTotal(100, 6)).toBe(540);
  });
});
