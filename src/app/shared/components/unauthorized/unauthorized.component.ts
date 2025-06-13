import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  template: `
    <div class="unauthorized-container">
      <mat-card class="unauthorized-card">
        <mat-card-content>
          <div class="icon-container">
            <mat-icon class="error-icon">block</mat-icon>
          </div>
          <h1>Access Denied</h1>
          <p>You don't have permission to access this resource.</p>
          
          <div class="actions">
            <button mat-raised-button color="primary" (click)="goBack()">
              Go Back
            </button>
            <button mat-button (click)="goHome()">
              Home
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
    }
    
    .unauthorized-card {
      max-width: 500px;
      text-align: center;
      padding: 40px;
    }
    
    .error-icon {
      font-size: 72px;
      width: 72px;
      height: 72px;
      color: #f44336;
    }
    
    .actions {
      margin-top: 32px;
      display: flex;
      gap: 16px;
      justify-content: center;
    }
  `]
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  goBack(): void {
    window.history.back();
  }

  goHome(): void {
    this.router.navigate(['/dashboard']);
  }
}
