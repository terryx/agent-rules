# Command–Query Separation (CQS)

```markdown
Command–Query Separation (CQS): A function either returns data or causes effects, never both.
```

### ❌ Bad Example: Function that both queries and commands

```javascript
function removeAndCountItems(array, item) {
  let count = 0;
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] === item) {
      array.splice(i, 1); // Mutates array (command)
      count++;
    }
  }
  return count; // Returns data (query)
}
```

**Problems:**
- Hard to predict if function will change state
- Difficult to test and reason about
- Unclear intent from function name

---

### ✅ Good Example: Separated commands and queries

```javascript
// Query: Returns data without mutation
function countItems(array, item) {
  return array.filter(x => x === item).length;
}

// Command: Only mutates, returns void
function removeAllItems(array, item) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] === item) {
      array.splice(i, 1);
    }
  }
}
```

**Benefits:**
- Clear separation of concerns
- Predictable behavior - queries are safe, commands have effects
- Easier to test and debug
- Functions have single, clear purpose