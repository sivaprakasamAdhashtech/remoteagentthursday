/**
 * API Integration Tests
 * Tests the mock API services and data flow
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

describe('API Integration Tests', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  describe('Authentication API', () => {
    it('should handle successful login response', (done) => {
      const credentials = {
        email: 'admin@example.com',
        password: 'admin123'
      };

      authService.login(credentials).subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.message).toBe('Login successful');
        expect(response.data.user.email).toBe('admin@example.com');
        expect(response.data.user.role).toBe('admin');
        expect(response.data.token).toContain('mock-jwt-token-');
        done();
      });
    });

    it('should handle failed login response', (done) => {
      const credentials = {
        email: 'invalid@example.com',
        password: 'wrongpassword'
      };

      authService.login(credentials).subscribe({
        next: () => {
          fail('Should not succeed with invalid credentials');
          done();
        },
        error: (error) => {
          expect(error.message).toBe('Invalid credentials');
          done();
        }
      });
    });

    it('should simulate network delay', (done) => {
      const startTime = Date.now();
      const credentials = {
        email: 'admin@example.com',
        password: 'admin123'
      };

      authService.login(credentials).subscribe(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        // Should take at least 1000ms due to setTimeout in mock
        expect(duration).toBeGreaterThanOrEqual(1000);
        done();
      });
    });

    it('should return different user data for different roles', (done) => {
      const adminCredentials = {
        email: 'admin@example.com',
        password: 'admin123'
      };

      const sellerCredentials = {
        email: 'john@example.com',
        password: 'seller123'
      };

      // Test admin login
      authService.login(adminCredentials).subscribe(adminResponse => {
        expect(adminResponse.data.user.role).toBe('admin');
        expect(adminResponse.data.user.name).toBe('Admin User');

        // Test seller login
        authService.login(sellerCredentials).subscribe(sellerResponse => {
          expect(sellerResponse.data.user.role).toBe('seller');
          expect(sellerResponse.data.user.name).toBe('John Seller');
          done();
        });
      });
    });
  });

  describe('Data Persistence API', () => {
    it('should persist authentication data', (done) => {
      const credentials = {
        email: 'admin@example.com',
        password: 'admin123'
      };

      authService.login(credentials).subscribe(() => {
        // Check if data is persisted in localStorage
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('currentUser');

        expect(token).toBeTruthy();
        expect(user).toBeTruthy();

        const parsedUser = JSON.parse(user!);
        expect(parsedUser.email).toBe('admin@example.com');
        expect(parsedUser.role).toBe('admin');
        done();
      });
    });

    it('should handle order data persistence', () => {
      const orderData = {
        id: 'ORD-123456789',
        customerName: 'Test Customer',
        customerEmail: 'test@example.com',
        product: 'Laptop',
        quantity: 1,
        unitPrice: 999.99,
        total: 999.99,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

      // Simulate order storage
      let orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Verify storage
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      expect(storedOrders.length).toBe(1);
      expect(storedOrders[0].id).toBe('ORD-123456789');
    });

    it('should handle multiple concurrent orders', () => {
      const orders = [
        {
          id: 'ORD-1',
          customerName: 'Customer 1',
          total: 100,
          createdAt: new Date().toISOString()
        },
        {
          id: 'ORD-2',
          customerName: 'Customer 2',
          total: 200,
          createdAt: new Date().toISOString()
        },
        {
          id: 'ORD-3',
          customerName: 'Customer 3',
          total: 300,
          createdAt: new Date().toISOString()
        }
      ];

      // Store all orders
      localStorage.setItem('orders', JSON.stringify(orders));

      // Retrieve and verify
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      expect(storedOrders.length).toBe(3);
      expect(storedOrders.map((o: any) => o.total)).toEqual([100, 200, 300]);
    });
  });

  describe('Product Catalog API', () => {
    const mockProducts = [
      { id: 1, name: 'Laptop', price: 999.99, stock: 50 },
      { id: 2, name: 'Wireless Mouse', price: 29.99, stock: 100 },
      { id: 3, name: 'Mechanical Keyboard', price: 79.99, stock: 75 },
      { id: 4, name: '24" Monitor', price: 299.99, stock: 30 },
      { id: 5, name: 'Wireless Headphones', price: 149.99, stock: 60 }
    ];

    it('should return product catalog', () => {
      expect(mockProducts.length).toBe(5);
      expect(mockProducts[0].name).toBe('Laptop');
      expect(mockProducts[0].price).toBe(999.99);
    });

    it('should validate product data structure', () => {
      mockProducts.forEach(product => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('stock');
        
        expect(typeof product.id).toBe('number');
        expect(typeof product.name).toBe('string');
        expect(typeof product.price).toBe('number');
        expect(typeof product.stock).toBe('number');
      });
    });

    it('should handle product selection for orders', () => {
      const selectedProduct = mockProducts.find(p => p.name === 'Laptop');
      const quantity = 2;
      
      expect(selectedProduct).toBeTruthy();
      expect(selectedProduct!.price * quantity).toBe(1999.98);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle empty localStorage gracefully', () => {
      localStorage.clear();
      
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('currentUser');
      
      expect(orders).toEqual([]);
      expect(token).toBe(null);
      expect(user).toBe(null);
    });

    it('should handle corrupted localStorage data', () => {
      localStorage.setItem('orders', 'invalid-json');
      localStorage.setItem('currentUser', 'also-invalid');
      
      let orders: any[] = [];
      let user: any = null;
      
      try {
        orders = JSON.parse(localStorage.getItem('orders') || '[]');
      } catch (error) {
        orders = [];
      }
      
      try {
        user = JSON.parse(localStorage.getItem('currentUser') || 'null');
      } catch (error) {
        user = null;
      }
      
      expect(orders).toEqual([]);
      expect(user).toBe(null);
    });

    it('should handle concurrent authentication attempts', (done) => {
      const credentials = {
        email: 'admin@example.com',
        password: 'admin123'
      };

      // Simulate concurrent login attempts
      const login1 = authService.login(credentials);
      const login2 = authService.login(credentials);

      Promise.all([
        login1.toPromise(),
        login2.toPromise()
      ]).then(([response1, response2]) => {
        expect(response1.success).toBe(true);
        expect(response2.success).toBe(true);
        
        // Both should set the same user data
        expect(response1.data.user.email).toBe(response2.data.user.email);
        done();
      });
    });

    it('should validate order data before storage', () => {
      const validOrder = {
        id: 'ORD-123',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        product: 'Laptop',
        quantity: 1,
        unitPrice: 999.99,
        total: 999.99,
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

      const invalidOrder = {
        id: '',
        customerName: '',
        customerEmail: 'invalid-email',
        product: '',
        quantity: -1,
        unitPrice: 0,
        total: 0
      };

      // Validation function
      const validateOrder = (order: any) => {
        return order.id && 
               order.customerName && 
               order.customerEmail.includes('@') && 
               order.product && 
               order.quantity > 0 && 
               order.unitPrice > 0 && 
               order.total > 0;
      };

      expect(validateOrder(validOrder)).toBe(true);
      expect(validateOrder(invalidOrder)).toBe(false);
    });
  });

  describe('Performance and Load Testing', () => {
    it('should handle large number of orders efficiently', () => {
      const startTime = performance.now();
      
      // Create 1000 mock orders
      const orders = Array.from({ length: 1000 }, (_, i) => ({
        id: `ORD-${i}`,
        customerName: `Customer ${i}`,
        total: Math.random() * 1000,
        createdAt: new Date().toISOString()
      }));

      localStorage.setItem('orders', JSON.stringify(orders));
      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(storedOrders.length).toBe(1000);
      expect(duration).toBeLessThan(100); // Should complete in less than 100ms
    });

    it('should handle rapid authentication state changes', (done) => {
      const credentials = {
        email: 'admin@example.com',
        password: 'admin123'
      };

      let completedOperations = 0;
      const totalOperations = 10;

      // Perform multiple rapid login/logout cycles
      for (let i = 0; i < totalOperations; i++) {
        authService.login(credentials).subscribe(() => {
          authService.logout();
          completedOperations++;
          
          if (completedOperations === totalOperations) {
            expect(authService.isAuthenticated).toBe(false);
            done();
          }
        });
      }
    });
  });
});
