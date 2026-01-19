import { test, expect } from '@playwright/test';
import calculateTotal from '../src/cart.js';

// Behaviors covered:
// 1. Returns 0 when price or quantity is falsy (0, null, undefined)
// 2. Calculates total without discount when quantity <= 5
// 3. Applies 10% discount when quantity > 5
// 4. Handles floating point prices accurately within tolerance
// 5. Handles large quantities efficiently and correctly

// Note: No external dependencies in calculateTotal, so no mocks required.

// 1. Returns 0 when price is falsy
[0, null, undefined].forEach((badPrice) => {
  test(`should return 0 when price is ${badPrice}`, () => {
    expect(calculateTotal(badPrice, 3)).toBe(0);
  });
});

// 1b. Returns 0 when quantity is falsy
[0, null, undefined].forEach((badQty) => {
  test(`should return 0 when quantity is ${badQty}`, () => {
    expect(calculateTotal(10, badQty)).toBe(0);
  });
});

// 2. No discount when quantity <= 5
[1, 2, 3, 4, 5].forEach((q) => {
  test(`should not apply discount for quantity ${q}`, () => {
    expect(calculateTotal(10, q)).toBe(10 * q);
  });
});

// 3. Discount when quantity > 5
[6, 7, 10].forEach((q) => {
  test(`should apply 10% discount for quantity ${q}`, () => {
    expect(calculateTotal(10, q)).toBe(10 * q * 0.9);
  });
});

// 4. Floating point prices
[test.fixme].forEach(() => {}); // keep file recognizable for Playwright; real tests below

test('should handle floating point prices within tolerance', () => {
  const total = calculateTotal(19.99, 3); // no discount (<=5)
  expect(total).toBeCloseTo(59.97, 2);
});

// 5. Large quantities
test('should handle large quantities correctly with discount', () => {
  const qty = 1000000;
  const price = 2;
  const total = calculateTotal(price, qty); // discount applies
  expect(total).toBe(price * qty * 0.9);
});
