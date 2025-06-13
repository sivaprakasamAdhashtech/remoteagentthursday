import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <div class="profile-container">
      <h1>Profile Settings</h1>
      <p>Manage your account information</p>
      
      <div class="empty-state">
        <mat-icon>person</mat-icon>
        <h3>Profile Management</h3>
        <p>This is a placeholder for the profile management module.</p>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    h1 {
      margin: 0 0 8px 0;
      font-size: 32px;
      font-weight: 300;
      color: #333;
    }
    
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }
    
    .empty-state mat-icon {
      font-size: 72px;
      width: 72px;
      height: 72px;
      margin-bottom: 24px;
      color: #ddd;
    }
  `]
})
export class ProfileComponent {}
