import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
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
    
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Authentication', () => {
    it('should login with valid admin credentials', (done) => {
      const credentials = {
        email: 'admin@example.com',
        password: 'admin123'
      };

      service.login(credentials).subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.data.user.email).toBe('admin@example.com');
        expect(response.data.user.role).toBe('admin');
        expect(localStorage.getItem('authToken')).toBeTruthy();
        expect(localStorage.getItem('currentUser')).toBeTruthy();
        done();
      });
    });

    it('should login with valid seller credentials', (done) => {
      const credentials = {
        email: 'john@example.com',
        password: 'seller123'
      };

      service.login(credentials).subscribe(response => {
        expect(response.success).toBe(true);
        expect(response.data.user.email).toBe('john@example.com');
        expect(response.data.user.role).toBe('seller');
        done();
      });
    });

    it('should reject invalid credentials', (done) => {
      const credentials = {
        email: 'invalid@example.com',
        password: 'wrongpassword'
      };

      service.login(credentials).subscribe({
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

    it('should set authentication state on successful login', (done) => {
      const credentials = {
        email: 'admin@example.com',
        password: 'admin123'
      };

      service.login(credentials).subscribe(() => {
        expect(service.isAuthenticated).toBe(true);
        expect(service.currentUser).toBeTruthy();
        expect(service.currentUser?.email).toBe('admin@example.com');
        done();
      });
    });

    it('should check admin role correctly', (done) => {
      const credentials = {
        email: 'admin@example.com',
        password: 'admin123'
      };

      service.login(credentials).subscribe(() => {
        expect(service.isAdmin).toBe(true);
        done();
      });
    });

    it('should check seller role correctly', (done) => {
      const credentials = {
        email: 'john@example.com',
        password: 'seller123'
      };

      service.login(credentials).subscribe(() => {
        expect(service.isAdmin).toBe(false);
        done();
      });
    });
  });

  describe('Logout', () => {
    it('should clear authentication state on logout', (done) => {
      const credentials = {
        email: 'admin@example.com',
        password: 'admin123'
      };

      service.login(credentials).subscribe(() => {
        // Verify logged in
        expect(service.isAuthenticated).toBe(true);
        
        // Logout
        service.logout();
        
        // Verify logged out
        expect(service.isAuthenticated).toBe(false);
        expect(service.currentUser).toBe(null);
        expect(localStorage.getItem('authToken')).toBe(null);
        expect(localStorage.getItem('currentUser')).toBe(null);
        expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
        done();
      });
    });
  });

  describe('Token Management', () => {
    it('should return token when authenticated', (done) => {
      const credentials = {
        email: 'admin@example.com',
        password: 'admin123'
      };

      service.login(credentials).subscribe(() => {
        const token = service.token;
        expect(token).toBeTruthy();
        expect(token).toContain('mock-jwt-token-');
        done();
      });
    });

    it('should return null token when not authenticated', () => {
      expect(service.token).toBe(null);
    });
  });

  describe('Authentication State Persistence', () => {
    it('should initialize authentication state from localStorage', () => {
      // Manually set localStorage
      const mockUser = {
        _id: 'test-id',
        name: 'Test User',
        email: 'test@example.com',
        role: 'admin' as const,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('authToken', 'test-token');
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      
      // Create new service instance to test initialization
      const newService = new AuthService(TestBed.inject(Router));
      
      expect(newService.isAuthenticated).toBe(true);
      expect(newService.currentUser?.email).toBe('test@example.com');
    });

    it('should handle corrupted localStorage data', () => {
      localStorage.setItem('authToken', 'test-token');
      localStorage.setItem('currentUser', 'invalid-json');
      
      const newService = new AuthService(TestBed.inject(Router));
      
      expect(newService.isAuthenticated).toBe(false);
      expect(newService.currentUser).toBe(null);
    });
  });
});
