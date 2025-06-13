import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  template: `
    <mat-sidenav-container class="layout-container">
      <mat-sidenav #sidenav mode="side" opened="true" class="sidenav">
        <div class="sidenav-header">
          <h2>IOM System</h2>
        </div>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/products">
            <mat-icon matListItemIcon>inventory_2</mat-icon>
            <span matListItemTitle>Products</span>
          </a>
          <a mat-list-item routerLink="/orders">
            <mat-icon matListItemIcon>shopping_cart</mat-icon>
            <span matListItemTitle>Orders</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      
      <mat-sidenav-content class="main-content">
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>Inventory & Order Management</span>
        </mat-toolbar>
        
        <div class="content-wrapper">
          <ng-content></ng-content>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .layout-container {
      height: 100vh;
    }
    
    .sidenav {
      width: 280px;
      background: #fafafa;
    }
    
    .sidenav-header {
      padding: 24px 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .sidenav-header h2 {
      margin: 0;
      font-weight: 600;
    }
    
    .main-content {
      display: flex;
      flex-direction: column;
    }
    
    .content-wrapper {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
      background: #f5f5f5;
    }
  `]
})
export class LayoutComponent {}
