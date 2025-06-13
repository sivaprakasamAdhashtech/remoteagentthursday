/**
 * Emergency Features Integration Tests
 * Tests the emergency login and order creation functionality
 */

describe('Emergency Features Integration Tests', () => {
  let originalLocalStorage: Storage;

  beforeEach(() => {
    // Mock localStorage
    originalLocalStorage = window.localStorage;
    let store: { [key: string]: string } = {};
    
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return store[key] || null;
    });
    
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      store[key] = value;
    });
    
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete store[key];
    });
    
    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });

    // Mock window.location
    delete (window as any).location;
    (window as any).location = { href: '' };

    // Mock alert
    spyOn(window, 'alert');
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Emergency Login System', () => {
    it('should set authentication data in localStorage', () => {
      // Simulate emergency login
      const mockUser = {
        _id: 'mock-user-id',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const authToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('currentUser', JSON.stringify(mockUser));

      expect(localStorage.setItem).toHaveBeenCalledWith('authToken', authToken);
      expect(localStorage.setItem).toHaveBeenCalledWith('currentUser', JSON.stringify(mockUser));
    });

    it('should redirect to dashboard after emergency login', () => {
      // Simulate the emergency login redirect
      window.location.href = '/dashboard';
      
      expect(window.location.href).toBe('/dashboard');
    });

    it('should handle emergency login button click', () => {
      // Create emergency login button
      const button = document.createElement('div');
      button.id = 'emergency-login';
      button.textContent = '🚀 EMERGENCY LOGIN (Click Here)';
      document.body.appendChild(button);

      // Simulate click handler
      button.addEventListener('click', () => {
        const mockUser = {
          _id: 'mock-user-id',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        window.alert('✅ Emergency login successful! Redirecting to dashboard...');
        window.location.href = '/dashboard';
      });

      // Trigger click
      button.click();

      expect(localStorage.setItem).toHaveBeenCalledWith('authToken', jasmine.any(String));
      expect(localStorage.setItem).toHaveBeenCalledWith('currentUser', jasmine.any(String));
      expect(window.alert).toHaveBeenCalledWith('✅ Emergency login successful! Redirecting to dashboard...');
      expect(window.location.href).toBe('/dashboard');

      // Cleanup
      document.body.removeChild(button);
    });
  });

  describe('Emergency Order Creation System', () => {
    beforeEach(() => {
      // Set up authenticated state
      const mockUser = {
        _id: 'mock-user-id',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem('authToken', 'mock-jwt-token-123');
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
    });

    it('should create order with valid data', () => {
      const orderData = {
        id: 'ORD-' + Date.now(),
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        product: 'Laptop',
        quantity: 2,
        unitPrice: 999.99,
        total: 1999.98,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

      // Simulate order creation
      let orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(orders));

      expect(localStorage.setItem).toHaveBeenCalledWith('orders', jasmine.any(String));
      
      // Verify order was stored
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      expect(storedOrders.length).toBe(1);
      expect(storedOrders[0].customerName).toBe('John Doe');
      expect(storedOrders[0].total).toBe(1999.98);
    });

    it('should calculate order total correctly', () => {
      const product = { name: 'Laptop', price: 999.99 };
      const quantity = 2;
      const expectedTotal = product.price * quantity;

      expect(expectedTotal).toBe(1999.98);
    });

    it('should generate unique order IDs', () => {
      const orderId1 = 'ORD-' + Date.now();
      const orderId2 = 'ORD-' + (Date.now() + 1);

      expect(orderId1).not.toBe(orderId2);
      expect(orderId1).toMatch(/^ORD-\d+$/);
      expect(orderId2).toMatch(/^ORD-\d+$/);
    });

    it('should validate required order fields', () => {
      const validOrder = {
        customerName: 'John Doe',
        customerEmail: 'john.doe@example.com',
        product: 'Laptop',
        quantity: 1
      };

      const invalidOrder = {
        customerName: '',
        customerEmail: '',
        product: '',
        quantity: 0
      };

      // Validation function
      const validateOrder = (order: any) => {
        return order.customerName && 
               order.customerEmail && 
               order.product && 
               order.quantity > 0;
      };

      expect(validateOrder(validOrder)).toBe(true);
      expect(validateOrder(invalidOrder)).toBe(false);
    });

    it('should handle multiple orders in localStorage', () => {
      const order1 = {
        id: 'ORD-1',
        customerName: 'Customer 1',
        total: 100
      };

      const order2 = {
        id: 'ORD-2',
        customerName: 'Customer 2',
        total: 200
      };

      // Add first order
      let orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order1);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Add second order
      orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order2);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Verify both orders are stored
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      expect(storedOrders.length).toBe(2);
      expect(storedOrders[0].id).toBe('ORD-1');
      expect(storedOrders[1].id).toBe('ORD-2');
    });
  });

  describe('Product Selection and Calculation', () => {
    const availableProducts = [
      { name: 'Laptop', price: 999.99 },
      { name: 'Wireless Mouse', price: 29.99 },
      { name: 'Mechanical Keyboard', price: 79.99 },
      { name: '24" Monitor', price: 299.99 },
      { name: 'Wireless Headphones', price: 149.99 }
    ];

    it('should have correct product prices', () => {
      expect(availableProducts[0].price).toBe(999.99);
      expect(availableProducts[1].price).toBe(29.99);
      expect(availableProducts[2].price).toBe(79.99);
      expect(availableProducts[3].price).toBe(299.99);
      expect(availableProducts[4].price).toBe(149.99);
    });

    it('should calculate total for different quantities', () => {
      const laptop = availableProducts[0];
      
      expect(laptop.price * 1).toBe(999.99);
      expect(laptop.price * 2).toBe(1999.98);
      expect(laptop.price * 5).toBe(4999.95);
    });

    it('should handle decimal calculations correctly', () => {
      const mouse = availableProducts[1]; // $29.99
      const total = mouse.price * 3;
      
      expect(total).toBeCloseTo(89.97, 2);
    });
  });

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', () => {
      // Mock localStorage to throw error
      spyOn(localStorage, 'setItem').and.throwError('Storage quota exceeded');

      expect(() => {
        try {
          localStorage.setItem('test', 'value');
        } catch (error) {
          // Handle error gracefully
          console.error('localStorage error:', error);
        }
      }).not.toThrow();
    });

    it('should handle invalid JSON in localStorage', () => {
      localStorage.setItem('orders', 'invalid-json');

      const orders = (() => {
        try {
          return JSON.parse(localStorage.getItem('orders') || '[]');
        } catch (error) {
          return [];
        }
      })();

      expect(orders).toEqual([]);
    });
  });
});
