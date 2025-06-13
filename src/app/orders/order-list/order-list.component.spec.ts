import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderListComponent } from './order-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        OrderListComponent,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule
      ],
      providers: [
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    mockDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement.nativeElement.textContent).toBe('Orders');
  });

  it('should display create order button', () => {
    const createButton = fixture.debugElement.query(By.css('button[color="primary"]'));
    expect(createButton).toBeTruthy();
    expect(createButton.nativeElement.textContent.trim()).toBe('add Create Order');
  });

  it('should show empty state when no orders exist', () => {
    expect(component.orders.length).toBe(0);
    
    const emptyStateCard = fixture.debugElement.query(By.css('.empty-state-card'));
    expect(emptyStateCard).toBeTruthy();
    
    const emptyStateText = fixture.debugElement.query(By.css('.empty-state h3'));
    expect(emptyStateText.nativeElement.textContent).toBe('No Orders Yet');
  });

  it('should open create order dialog when button is clicked', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(null));
    mockDialog.open.and.returnValue(dialogRefSpy);

    const createButton = fixture.debugElement.query(By.css('button[color="primary"]'));
    createButton.nativeElement.click();

    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should add order when dialog returns result', () => {
    const mockOrderData = {
      customerName: 'Test Customer',
      customerEmail: 'test@example.com',
      items: [{
        product: { name: 'Test Product', price: 100 },
        quantity: 2,
        unitPrice: 100,
        total: 200
      }],
      total: 200
    };

    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(mockOrderData));
    mockDialog.open.and.returnValue(dialogRefSpy);

    spyOn(component, 'addOrder').and.callThrough();
    spyOn(window, 'alert');

    const createButton = fixture.debugElement.query(By.css('button[color="primary"]'));
    createButton.nativeElement.click();

    expect(component.addOrder).toHaveBeenCalledWith(mockOrderData);
    expect(component.orders.length).toBe(1);
    expect(component.orders[0].customerName).toBe('Test Customer');
    expect(component.orders[0].total).toBe(200);
    expect(component.orders[0].status).toBe('Pending');
    expect(window.alert).toHaveBeenCalled();
  });

  it('should generate unique order ID', () => {
    const mockOrderData = {
      customerName: 'Test Customer',
      customerEmail: 'test@example.com',
      items: [],
      total: 100
    };

    component.addOrder(mockOrderData);
    const orderId = component.orders[0].id;

    expect(orderId).toMatch(/^ORD-\d+$/);
  });

  it('should display orders table when orders exist', () => {
    // Add a test order
    const mockOrderData = {
      customerName: 'Test Customer',
      customerEmail: 'test@example.com',
      items: [],
      total: 100
    };
    
    component.addOrder(mockOrderData);
    fixture.detectChanges();

    const ordersTable = fixture.debugElement.query(By.css('.orders-table'));
    expect(ordersTable).toBeTruthy();

    const tableRows = fixture.debugElement.queryAll(By.css('tr[mat-row]'));
    expect(tableRows.length).toBe(1);
  });

  it('should have correct table columns', () => {
    expect(component.displayedColumns).toEqual(['id', 'customer', 'total', 'status']);
  });

  it('should initialize with empty orders array', () => {
    expect(component.orders).toEqual([]);
  });

  it('should not add order when dialog is cancelled', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(null));
    mockDialog.open.and.returnValue(dialogRefSpy);

    const createButton = fixture.debugElement.query(By.css('button[color="primary"]'));
    createButton.nativeElement.click();

    expect(component.orders.length).toBe(0);
  });
});
