# Inventory & Order Management System - Angular Frontend

A professional, feature-rich Angular application for managing inventory and orders with role-based access control.

## 🚀 Features

### Authentication & Authorization
- **User Registration** - Admin and Seller role registration
- **Secure Login** - JWT token-based authentication
- **Role-based Access Control** - Different permissions for Admin and Seller
- **Profile Management** - Update profile information and change password
- **Token Verification** - Automatic token validation and refresh

### Product Management
- **Product CRUD Operations** - Create, read, update, delete products
- **Advanced Search & Filtering** - Search by name, SKU, category
- **Pagination** - Efficient data loading with pagination
- **Stock Management** - Track inventory levels with visual indicators
- **Category Management** - Organize products by categories
- **Seller-specific Products** - Sellers can manage their own products

### Order Management
- **Order Creation** - Create orders from product selection
- **Order Tracking** - View order status and details
- **Order Management** - Admin can update order status
- **Order History** - Complete order history with filtering
- **Order Cancellation** - Sellers can cancel their orders

### Admin Panel
- **User Management** - View, activate/deactivate user accounts
- **Dashboard Analytics** - System statistics and insights
- **Activity Logs** - Track all system activities
- **System Health** - Monitor system performance
- **Advanced Reporting** - Generate reports and analytics

### UI/UX Features
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Material Design** - Professional Angular Material UI
- **Dark/Light Theme Support** - Customizable themes
- **Loading States** - Smooth loading indicators
- **Error Handling** - Comprehensive error management
- **Notifications** - Toast notifications for user feedback

## 🛠️ Technology Stack

- **Angular 17** - Latest Angular framework
- **Angular Material** - UI component library
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming
- **SCSS** - Advanced styling
- **Chart.js** - Data visualization
- **JWT** - Authentication tokens

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Angular CLI** (v17 or higher)
- **Backend API** running on `http://localhost:3000`

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd inventory-order-management
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration
Update the API URL in `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api', // Update this to your backend URL
  appName: 'Inventory & Order Management System',
  version: '1.0.0'
};
```

### 4. Start the Development Server
```bash
ng serve
# or
npm start
```

The application will be available at `http://localhost:4200`

## 🏗️ Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                 # Core functionality
│   │   ├── guards/          # Route guards
│   │   ├── interceptors/    # HTTP interceptors
│   │   ├── models/          # TypeScript interfaces
│   │   └── services/        # Core services
│   ├── shared/              # Shared components
│   │   └── components/      # Reusable UI components
│   ├── auth/                # Authentication module
│   ├── dashboard/           # Dashboard module
│   ├── products/            # Product management
│   ├── orders/              # Order management
│   ├── admin/               # Admin panel
│   └── profile/             # User profile
├── assets/                  # Static assets
├── environments/            # Environment configurations
└── styles/                  # Global styles
```

## 🔐 User Roles & Permissions

### Admin Users
- Full system access
- User management
- All product operations
- Order status management
- System analytics and logs
- Dashboard with system metrics

### Seller Users
- Product management (own products)
- Order viewing and cancellation
- Profile management
- Basic dashboard with personal metrics

## 🎨 UI Components

The application uses Angular Material components with custom styling:

- **Navigation** - Responsive sidebar with role-based menu items
- **Forms** - Reactive forms with validation
- **Tables** - Data tables with sorting and pagination
- **Cards** - Information display cards
- **Dialogs** - Modal dialogs for confirmations
- **Snackbars** - Toast notifications
- **Progress Indicators** - Loading states

## 🔧 Configuration

### API Integration
The application is configured to work with the backend API defined in the Postman collection. Key endpoints:

- **Authentication**: `/auth/*`
- **Products**: `/products/*`
- **Orders**: `/orders/*`
- **Admin**: `/admin/*`

### Route Protection
Routes are protected using Angular guards:
- `AuthGuard` - Requires authentication
- `RoleGuard` - Requires specific roles

## 🧪 Testing

Run unit tests:
```bash
ng test
```

Run end-to-end tests:
```bash
ng e2e
```

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (< 768px)

## 🎯 Key Features Implementation

### Authentication Flow
1. User registers with role selection
2. Login with email/password
3. JWT token stored in localStorage
4. Token attached to API requests
5. Automatic logout on token expiry

### Product Management
1. Create products with validation
2. Upload product images (placeholder implementation)
3. Search and filter products
4. Paginated product listing
5. Stock level monitoring

### Order Processing
1. Select products for order
2. Calculate totals automatically
3. Submit order with shipping address
4. Track order status changes
5. Order history and details

## 🚀 Deployment

### Development
```bash
ng serve --host 0.0.0.0 --port 4200
```

### Production
```bash
ng build --configuration production
# Deploy the dist/ folder to your web server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API collection for backend integration

## 🔄 Updates

The application is designed to be easily maintainable and extensible:
- Modular architecture
- Lazy-loaded routes
- Reusable components
- Type-safe development
- Comprehensive error handling

---

**Built with ❤️ using Angular and Material Design**
