# Branching on One Discriminator

```markdown
Use switch, pattern matching, strategy, or a lookup table for branching on one discriminator.
```

### ❌ Bad Example: Multiple if-else statements

```javascript
function getShippingCost(shippingMethod) {
  if (shippingMethod === 'standard') {
    return 5.99;
  } else if (shippingMethod === 'express') {
    return 12.99;
  } else if (shippingMethod === 'overnight') {
    return 24.99;
  } else if (shippingMethod === 'pickup') {
    return 0;
  } else {
    throw new Error('Invalid shipping method');
  }
}
```

**Problems:**
- Repetitive if-else chain structure
- Hard to maintain when adding new methods
- Not easily extensible

---

### ✅ Good Example: Lookup table approach

```javascript
function getShippingCost(shippingMethod) {
  const shippingCosts = {
    standard: 5.99,
    express: 12.99,
    overnight: 24.99,
    pickup: 0
  };
  
  if (!(shippingMethod in shippingCosts)) {
    throw new Error('Invalid shipping method');
  }
  
  return shippingCosts[shippingMethod];
}
```

### ✅ Alternative: Switch statement

```javascript
function getShippingCost(shippingMethod) {
  switch (shippingMethod) {
    case 'standard':
      return 5.99;
    case 'express':
      return 12.99;
    case 'overnight':
      return 24.99;
    case 'pickup':
      return 0;
    default:
      throw new Error('Invalid shipping method');
  }
}
```

**Benefits:**
- Cleaner, more readable code
- Clear mapping between discriminator and action
- Better performance with lookup tables