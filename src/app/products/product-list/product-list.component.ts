import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="product-list-container">
      <div class="page-header">
        <h1>Products</h1>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          Add Product
        </button>
      </div>
      
      <div class="empty-state">
        <mat-icon>inventory_2</mat-icon>
        <h3>Products Module</h3>
        <p>This is a placeholder for the products module. The full implementation would include:</p>
        <ul>
          <li>Product listing with search and filters</li>
          <li>Product creation and editing forms</li>
          <li>Product details view</li>
          <li>Stock management</li>
          <li>Category management</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .product-list-container {
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
    
    .empty-state h3 {
      margin: 0 0 16px 0;
      color: #333;
    }
    
    .empty-state ul {
      text-align: left;
      max-width: 400px;
      margin: 24px auto;
    }
  `]
})
export class ProductListComponent {}
