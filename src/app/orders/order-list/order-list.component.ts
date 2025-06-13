import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="order-list-container">
      <div class="page-header">
        <h1>Orders</h1>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          Create Order
        </button>
      </div>
      
      <div class="empty-state">
        <mat-icon>shopping_cart</mat-icon>
        <h3>Orders Module</h3>
        <p>This is a placeholder for the orders module.</p>
      </div>
    </div>
  `,
  styles: [`
    .order-list-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    
    h1 {
      margin: 0;
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
export class OrderListComponent {}
