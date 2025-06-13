import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome to the Inventory & Order Management System!</p>
      
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-info">
                <h3>Total Products</h3>
                <div class="stat-value">1,247</div>
              </div>
              <div class="stat-icon">
                <mat-icon>inventory_2</mat-icon>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-info">
                <h3>Total Orders</h3>
                <div class="stat-value">856</div>
              </div>
              <div class="stat-icon">
                <mat-icon>shopping_cart</mat-icon>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-info">
                <h3>Revenue</h3>
                <div class="stat-value">$45,678</div>
              </div>
              <div class="stat-icon">
                <mat-icon>attach_money</mat-icon>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      margin: 0 0 8px 0;
      font-size: 32px;
      font-weight: 300;
      color: #333;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 32px;
    }
    
    .stat-card {
      border-left: 4px solid #3f51b5;
    }
    
    .stat-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .stat-info h3 {
      margin: 0 0 8px 0;
      font-size: 14px;
      color: #666;
      text-transform: uppercase;
      font-weight: 500;
    }
    
    .stat-value {
      font-size: 32px;
      font-weight: 300;
      color: #333;
    }
    
    .stat-icon mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #ddd;
    }
  `]
})
export class DashboardComponent {}
