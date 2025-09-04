export const shippingCostSet = {
  bad: `function getShippingCost(shippingMethod) {
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
}`,
  good: `function getShippingCost(shippingMethod) {
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
}`
};

export const userPermissionsSet = {
  bad: `function checkUserPermissions(user) {
  if (user.role === 'admin') {
    if (user.department === 'IT') {
      return ['read', 'write', 'delete', 'admin'];
    } else if (user.department === 'HR') {
      return ['read', 'write', 'user_management'];
    } else {
      return ['read', 'write'];
    }
  } else if (user.role === 'manager') {
    if (user.department === 'sales') {
      return ['read', 'write', 'reports'];
    } else {
      return ['read', 'write'];
    }
  } else {
    return ['read'];
  }
}`,
  good: `function checkUserPermissions(user) {
  const permissions = {
    admin: {
      IT: ['read', 'write', 'delete', 'admin'],
      HR: ['read', 'write', 'user_management'],
      default: ['read', 'write']
    },
    manager: {
      sales: ['read', 'write', 'reports'],
      default: ['read', 'write']
    },
    default: ['read']
  };
  
  const rolePerms = permissions[user.role] || permissions.default;
  if (typeof rolePerms === 'object' && !Array.isArray(rolePerms)) {
    return rolePerms[user.department] || rolePerms.default;
  }
  return rolePerms;
}`
};

export const taxCalculationSet = {
  bad: `function calculateTax(state, income) {
  if (state === 'CA') {
    if (income < 50000) {
      return income * 0.08;
    } else if (income < 100000) {
      return income * 0.09;
    } else {
      return income * 0.11;
    }
  } else if (state === 'NY') {
    if (income < 40000) {
      return income * 0.07;
    } else {
      return income * 0.10;
    }
  } else if (state === 'TX') {
    return 0;
  } else {
    return income * 0.05;
  }
}`,
  good: `function calculateTax(state, income) {
  const taxRates = {
    CA: [
      { min: 0, max: 50000, rate: 0.08 },
      { min: 50000, max: 100000, rate: 0.09 },
      { min: 100000, max: Infinity, rate: 0.11 }
    ],
    NY: [
      { min: 0, max: 40000, rate: 0.07 },
      { min: 40000, max: Infinity, rate: 0.10 }
    ],
    TX: [{ min: 0, max: Infinity, rate: 0 }]
  };
  
  const stateTaxRates = taxRates[state];
  if (!stateTaxRates) {
    return income * 0.05;
  }
  
  const bracket = stateTaxRates.find(b => income >= b.min && income < b.max);
  return income * bracket.rate;
}`
};