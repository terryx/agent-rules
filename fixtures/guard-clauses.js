export const discountCalculationSet = {
  bad: `function calculateDiscount(price, customerType, coupon) {
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
}`,
  good: `function calculateDiscount(price, customerType, coupon) {
  if (price <= 0) throw new Error('Invalid price');
  if (customerType !== 'premium') return price;
  
  return coupon === 'SAVE20' ? price * 0.8 : price * 0.9;
}`
};

export const userValidationSet = {
  bad: `function processUserData(user) {
  if (user) {
    if (user.email) {
      if (user.email.includes('@')) {
        if (user.age >= 18) {
          if (user.isActive) {
            return { status: 'valid', message: 'User processed successfully' };
          } else {
            return { status: 'error', message: 'User is not active' };
          }
        } else {
          return { status: 'error', message: 'User must be 18 or older' };
        }
      } else {
        return { status: 'error', message: 'Invalid email format' };
      }
    } else {
      return { status: 'error', message: 'Email is required' };
    }
  } else {
    return { status: 'error', message: 'User data is required' };
  }
}`,
  good: `function processUserData(user) {
  if (!user) return { status: 'error', message: 'User data is required' };
  if (!user.email) return { status: 'error', message: 'Email is required' };
  if (!user.email.includes('@')) return { status: 'error', message: 'Invalid email format' };
  if (user.age < 18) return { status: 'error', message: 'User must be 18 or older' };
  if (!user.isActive) return { status: 'error', message: 'User is not active' };
  
  return { status: 'valid', message: 'User processed successfully' };
}`
};

export const fileProcessingSet = {
  bad: `function processFile(filePath, options) {
  if (filePath) {
    if (typeof filePath === 'string') {
      if (filePath.length > 0) {
        if (options) {
          if (options.format) {
            if (options.format === 'json' || options.format === 'xml') {
              return { success: true, data: 'File processed with format: ' + options.format };
            } else {
              throw new Error('Unsupported format');
            }
          } else {
            return { success: true, data: 'File processed with default format' };
          }
        } else {
          return { success: true, data: 'File processed with default options' };
        }
      } else {
        throw new Error('File path cannot be empty');
      }
    } else {
      throw new Error('File path must be a string');
    }
  } else {
    throw new Error('File path is required');
  }
}`,
  good: `function processFile(filePath, options) {
  if (!filePath) throw new Error('File path is required');
  if (typeof filePath !== 'string') throw new Error('File path must be a string');
  if (filePath.length === 0) throw new Error('File path cannot be empty');
  
  if (!options) return { success: true, data: 'File processed with default options' };
  if (!options.format) return { success: true, data: 'File processed with default format' };
  if (options.format !== 'json' && options.format !== 'xml') {
    throw new Error('Unsupported format');
  }
  
  return { success: true, data: 'File processed with format: ' + options.format };
}`
};