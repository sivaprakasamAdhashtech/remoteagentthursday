import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  template: `
    <div class="not-found-container">
      <mat-card class="not-found-card">
        <mat-card-content>
          <div class="icon-container">
            <mat-icon class="error-icon">search_off</mat-icon>
          </div>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist.</p>
          
          <div class="actions">
            <button mat-raised-button color="primary" (click)="goHome()">
              Go Home
            </button>
            <button mat-button (click)="goBack()">
              Go Back
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .not-found-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
    }
    
    .not-found-card {
      max-width: 500px;
      text-align: center;
      padding: 40px;
    }
    
    .error-icon {
      font-size: 72px;
      width: 72px;
      height: 72px;
      color: #ff9800;
    }
    
    h1 {
      margin: 0;
      font-size: 72px;
      font-weight: 300;
    }
    
    .actions {
      margin-top: 32px;
      display: flex;
      gap: 16px;
      justify-content: center;
    }
  `]
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goBack(): void {
    window.history.back();
  }

  goHome(): void {
    this.router.navigate(['/dashboard']);
  }
}
