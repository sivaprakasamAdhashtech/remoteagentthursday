import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'seller';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        this.currentUserSubject.next(parsedUser);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        this.logout();
      }
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Mock authentication for demo purposes
    return new Observable<LoginResponse>(observer => {
      setTimeout(() => {
        if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
          const mockResponse: LoginResponse = {
            success: true,
            message: 'Login successful',
            data: {
              token: 'mock-jwt-token-' + Date.now(),
              user: {
                _id: 'mock-user-id',
                name: 'Admin User',
                email: credentials.email,
                role: 'admin',
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }
            }
          };
          this.setAuthData(mockResponse.data.token, mockResponse.data.user);
          observer.next(mockResponse);
          observer.complete();
        } else if (credentials.email === 'john@example.com' && credentials.password === 'seller123') {
          const mockResponse: LoginResponse = {
            success: true,
            message: 'Login successful',
            data: {
              token: 'mock-jwt-token-' + Date.now(),
              user: {
                _id: 'mock-seller-id',
                name: 'John Seller',
                email: credentials.email,
                role: 'seller',
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }
            }
          };
          this.setAuthData(mockResponse.data.token, mockResponse.data.user);
          observer.next(mockResponse);
          observer.complete();
        } else {
          observer.error({ message: 'Invalid credentials' });
        }
      }, 1000); // Simulate network delay
    });
  }

  logout(): void {
    this.clearAuthData();
  }

  private setAuthData(token: string, user: User): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private clearAuthData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  get token(): string | null {
    return localStorage.getItem('authToken');
  }
}
