import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
          errorMessage = error.error.message;
        } else {
          switch (error.status) {
            case 401:
              localStorage.removeItem('authToken');
              localStorage.removeItem('currentUser');
              this.router.navigate(['/auth/login']);
              errorMessage = 'Session expired. Please login again.';
              break;
            case 403:
              errorMessage = 'You do not have permission to access this resource.';
              this.router.navigate(['/unauthorized']);
              break;
            case 404:
              errorMessage = 'Resource not found.';
              break;
            case 500:
              errorMessage = 'Internal server error. Please try again later.';
              break;
            default:
              errorMessage = error.error?.message || `Error Code: ${error.status}`;
          }
        }

        return throwError(() => ({ ...error, message: errorMessage }));
      })
    );
  }
}
