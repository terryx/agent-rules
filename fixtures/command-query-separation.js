export const removeAndCountSet = {
  bad: `function removeAndCountItems(array, item) {
  let count = 0;
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] === item) {
      array.splice(i, 1); // Mutates array (command)
      count++;
    }
  }
  return count; // Returns data (query)
}`,
  good: `// Query: Returns data without mutation
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
}`
};

export const updateUserSet = {
  bad: `function updateUserAndGetOld(users, userId, newData) {
  const user = users.find(u => u.id === userId);
  const oldData = { ...user };
  
  // Mutates the user object (command)
  Object.assign(user, newData);
  user.lastModified = new Date();
  
  return oldData; // Returns data (query)
}`,
  good: `// Query: Returns data without mutation
function getUserById(users, userId) {
  return users.find(u => u.id === userId);
}

// Command: Only mutates, returns void
function updateUser(users, userId, newData) {
  const user = users.find(u => u.id === userId);
  if (user) {
    Object.assign(user, newData);
    user.lastModified = new Date();
  }
}`
};

export const processOrderSet = {
  bad: `function processOrderAndCalculateTotal(order, discountPercent) {
  // Mutates order status (command)
  order.status = 'processing';
  order.processedAt = new Date();
  
  // Apply discount mutation (command)
  order.items.forEach(item => {
    item.price = item.price * (1 - discountPercent / 100);
  });
  
  // Calculate and return total (query)
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}`,
  good: `// Query: Returns data without mutation
function calculateOrderTotal(order, discountPercent) {
  return order.items.reduce((sum, item) => {
    const discountedPrice = item.price * (1 - discountPercent / 100);
    return sum + discountedPrice * item.quantity;
  }, 0);
}

// Command: Only mutates, returns void
function processOrder(order, discountPercent) {
  order.status = 'processing';
  order.processedAt = new Date();
  
  order.items.forEach(item => {
    item.price = item.price * (1 - discountPercent / 100);
  });
}`
};