# Guard Clauses / Fail-Fast

> **Rule from AGENTS.md**: Guard Clauses / Fail-Fast: Handle invalid or special cases early and return immediately.

### ❌ Bad Example: Deeply nested conditions

```javascript
function calculateDiscount(price, customerType, coupon) {
  if (price > 0) {
    if (customerType === 'premium') {
      if (coupon === 'SAVE20') {
        return price * 0.8; // 20% discount
      } else {
        return price * 0.9; // 10% discount
      }
    } else {
      return price; // no discount
    }
  } else {
    throw new Error('Invalid price');
  }
}
```

**Problems:**
- Hard to follow the main flow
- Error handling is buried at the bottom
- More cognitive load to understand

### ✅ Good Example: Guard clauses with early returns

```javascript
function calculateDiscountWithGuards(price, customerType, coupon) {
  if (price <= 0) throw new Error('Invalid price');
  if (customerType !== 'premium') return price;
  
  return coupon === 'SAVE20' ? price * 0.8 : price * 0.9;
}
```

**Benefits:**
- Invalid inputs handled immediately
- Main logic is clear and at the top level
- Reduced nesting and cognitive complexity
