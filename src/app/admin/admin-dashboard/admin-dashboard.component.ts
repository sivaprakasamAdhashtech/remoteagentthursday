import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <div class="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <p>Administrative panel for system management</p>
      
      <div class="empty-state">
        <mat-icon>admin_panel_settings</mat-icon>
        <h3>Admin Panel</h3>
        <p>This is a placeholder for the admin dashboard.</p>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard-container {
      max-width: 1200px;
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
export class AdminDashboardComponent {}
