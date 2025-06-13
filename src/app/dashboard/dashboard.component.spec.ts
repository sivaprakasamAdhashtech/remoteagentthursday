import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        MatCardModule,
        MatIconModule,
        MatButtonModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display dashboard title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement.nativeElement.textContent).toBe('Dashboard');
  });

  it('should display welcome message', () => {
    const welcomeElement = fixture.debugElement.query(By.css('p'));
    expect(welcomeElement.nativeElement.textContent).toBe('Welcome to the Inventory & Order Management System!');
  });

  it('should display three statistics cards', () => {
    const statCards = fixture.debugElement.queryAll(By.css('.stat-card'));
    expect(statCards.length).toBe(3);
  });

  it('should display correct statistics values', () => {
    const statValues = fixture.debugElement.queryAll(By.css('.stat-value'));
    
    expect(statValues[0].nativeElement.textContent).toBe('1,247');
    expect(statValues[1].nativeElement.textContent).toBe('856');
    expect(statValues[2].nativeElement.textContent).toBe('$45,678');
  });

  it('should display correct statistics labels', () => {
    const statLabels = fixture.debugElement.queryAll(By.css('.stat-info h3'));
    
    expect(statLabels[0].nativeElement.textContent).toBe('Total Products');
    expect(statLabels[1].nativeElement.textContent).toBe('Total Orders');
    expect(statLabels[2].nativeElement.textContent).toBe('Revenue');
  });

  it('should display correct icons for each statistic', () => {
    const icons = fixture.debugElement.queryAll(By.css('.stat-icon mat-icon'));
    
    expect(icons[0].nativeElement.textContent).toBe('inventory_2');
    expect(icons[1].nativeElement.textContent).toBe('shopping_cart');
    expect(icons[2].nativeElement.textContent).toBe('attach_money');
  });

  it('should have responsive grid layout', () => {
    const statsGrid = fixture.debugElement.query(By.css('.stats-grid'));
    expect(statsGrid).toBeTruthy();
    
    const computedStyle = window.getComputedStyle(statsGrid.nativeElement);
    expect(computedStyle.display).toBe('grid');
  });

  it('should apply correct styling to stat cards', () => {
    const statCards = fixture.debugElement.queryAll(By.css('.stat-card'));
    
    statCards.forEach(card => {
      const computedStyle = window.getComputedStyle(card.nativeElement);
      expect(computedStyle.borderLeft).toContain('4px solid');
    });
  });
});
