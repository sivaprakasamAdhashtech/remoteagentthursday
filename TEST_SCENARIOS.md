# 🎭 Test Scenarios - Angular Inventory & Order Management System

**Document Version:** 1.0  
**Created:** June 13, 2025  
**Application:** Angular Inventory & Order Management System  
**Environment:** Development/Testing  

---

## 📋 Test Scenario Documentation Structure

Each test scenario represents a complete user journey or business workflow:
- **Scenario ID:** Unique identifier
- **Scenario Name:** Descriptive business scenario
- **Business Objective:** What business goal this tests
- **User Type:** Admin/Seller/General User
- **Preconditions:** Required setup before scenario
- **Test Flow:** Complete step-by-step user journey
- **Expected Outcome:** Business result expected
- **Success Criteria:** Measurable success indicators
- **Risk Level:** High/Medium/Low business impact

---

## 🔐 Authentication Scenarios

### TS_AUTH_001: First-Time Admin User Login Journey
- **Business Objective:** Verify admin can access system and perform administrative tasks
- **User Type:** Admin
- **Risk Level:** High
- **Preconditions:** 
  - Application is running on http://localhost:8080
  - No existing user session
  - Admin credentials available

**Test Flow:**
1. **Initial Access**
   - User navigates to http://localhost:8080
   - System detects no authentication
   - User automatically redirected to /auth/login

2. **Login Process**
   - User sees login form with pre-filled credentials
   - User enters admin@example.com and admin123
   - User clicks "Sign In" button
   - System validates credentials

3. **Post-Login Experience**
   - User redirected to dashboard
   - Dashboard displays admin-specific content
   - Navigation menu shows all available options including Admin section
   - User can access all protected routes

**Expected Outcome:**
- Admin successfully authenticated with full system access
- All administrative features available
- Session persists across page refreshes

**Success Criteria:**
- Login completes in < 2 seconds
- Dashboard loads with correct statistics
- Admin menu items visible
- No authentication errors

### TS_AUTH_002: Emergency Login Bypass Scenario
- **Business Objective:** Verify emergency login system works for development/testing
- **User Type:** Developer/Tester
- **Risk Level:** Medium (Development only)
- **Preconditions:**
  - Application loaded
  - Emergency login button visible
  - No existing session

**Test Flow:**
1. **Emergency Access Need**
   - Standard login form has issues or user needs quick access
   - User locates red "🚀 EMERGENCY LOGIN" button in top-right corner
   - User clicks emergency login button

2. **Instant Authentication**
   - System bypasses all form validation
   - Mock authentication data set in localStorage
   - Success alert displayed
   - Automatic redirect to dashboard

3. **Verification**
   - User has full access to application
   - All features work as if normally logged in
   - Session data properly set

**Expected Outcome:**
- Instant access without form validation
- Full application functionality available
- Development/testing can proceed without login issues

**Success Criteria:**
- Emergency login completes instantly
- All application features accessible
- No authentication-related errors

### TS_AUTH_003: Session Persistence Across Browser Actions
- **Business Objective:** Ensure user doesn't lose session during normal browser usage
- **User Type:** Any authenticated user
- **Risk Level:** High
- **Preconditions:**
  - User successfully logged in
  - Application in active use

**Test Flow:**
1. **Initial Authentication**
   - User logs in with valid credentials
   - User navigates to different sections (Dashboard, Orders, Products)
   - User creates an order

2. **Browser Actions**
   - User refreshes the page
   - User opens new tab and navigates to application
   - User closes and reopens browser (within session timeout)

3. **Session Validation**
   - User remains authenticated after each action
   - Previous work (orders) still available
   - No need to re-authenticate

**Expected Outcome:**
- Seamless user experience without repeated logins
- Work preserved across browser actions
- Consistent authentication state

**Success Criteria:**
- No unexpected logouts
- Data persistence maintained
- User experience uninterrupted

---

## 🛒 Order Management Scenarios

### TS_ORDER_001: Complete Order Creation Workflow
- **Business Objective:** Verify end-to-end order creation process works correctly
- **User Type:** Admin/Seller
- **Risk Level:** High
- **Preconditions:**
  - User authenticated
  - Product catalog available
  - Order creation system functional

**Test Flow:**
1. **Order Initiation**
   - User clicks green "📦 CREATE ORDER" button in top-right corner
   - Order creation modal opens
   - Form displays with pre-filled customer information

2. **Customer Information**
   - User reviews/modifies customer name: "John Doe"
   - User reviews/modifies customer email: "john.doe@example.com"
   - User verifies email format validation

3. **Product Selection**
   - User opens product dropdown
   - User sees all 5 available products with prices
   - User selects "Laptop" ($999.99)

4. **Quantity and Calculation**
   - User enters quantity: 2
   - System automatically calculates total: $1,999.98
   - Order summary updates in real-time

5. **Order Submission**
   - User reviews complete order summary
   - User clicks "Create Order" button
   - System validates all fields

6. **Order Confirmation**
   - Unique order ID generated (ORD-timestamp format)
   - Success message displays with order details
   - Order stored in localStorage
   - Modal closes automatically

**Expected Outcome:**
- Complete order successfully created and stored
- Customer receives order confirmation details
- Order available for future reference

**Success Criteria:**
- Order creation completes in < 5 seconds
- Order ID is unique and properly formatted
- All order data accurately stored
- Success confirmation clearly displayed

### TS_ORDER_002: Multiple Orders Creation Session
- **Business Objective:** Verify system handles multiple orders efficiently
- **User Type:** Admin/Seller
- **Risk Level:** Medium
- **Preconditions:**
  - User authenticated
  - Order creation system functional

**Test Flow:**
1. **First Order**
   - Create order: Laptop × 1 for Customer A
   - Verify order stored with ID: ORD-[timestamp1]

2. **Second Order**
   - Create order: Wireless Mouse × 3 for Customer B
   - Verify order stored with ID: ORD-[timestamp2]

3. **Third Order**
   - Create order: Monitor × 2 for Customer C
   - Verify order stored with ID: ORD-[timestamp3]

4. **Data Verification**
   - Check localStorage contains all 3 orders
   - Verify each order has unique ID
   - Confirm all order data integrity

**Expected Outcome:**
- All orders created successfully
- Each order maintains data integrity
- System performance remains consistent

**Success Criteria:**
- All 3 orders stored correctly
- No data conflicts or overwrites
- Order IDs are unique
- Performance doesn't degrade

### TS_ORDER_003: Order Validation and Error Handling
- **Business Objective:** Verify system properly validates order data and handles errors
- **User Type:** Admin/Seller
- **Risk Level:** Medium
- **Preconditions:**
  - User authenticated
  - Order creation modal open

**Test Flow:**
1. **Empty Fields Validation**
   - Clear customer name field
   - Attempt to submit order
   - Verify validation error displayed

2. **Invalid Email Validation**
   - Enter invalid email format: "invalid-email"
   - Attempt to submit order
   - Verify email validation error

3. **Missing Product Selection**
   - Leave product dropdown unselected
   - Attempt to submit order
   - Verify product selection error

4. **Invalid Quantity**
   - Enter quantity: 0 or negative number
   - Attempt to submit order
   - Verify quantity validation error

5. **Successful Correction**
   - Fill all fields correctly
   - Submit order successfully
   - Verify order creation works after corrections

**Expected Outcome:**
- All validation errors properly caught and displayed
- User guided to correct input errors
- Successful submission after corrections

**Success Criteria:**
- Clear error messages for each validation failure
- Form submission prevented with invalid data
- Successful order creation after corrections

---

## 📊 Dashboard and Navigation Scenarios

### TS_DASH_001: Dashboard Information Display
- **Business Objective:** Verify dashboard provides accurate business overview
- **User Type:** Admin/Seller
- **Risk Level:** Medium
- **Preconditions:**
  - User authenticated
  - Dashboard accessible

**Test Flow:**
1. **Dashboard Access**
   - User navigates to dashboard
   - Dashboard loads with statistics cards

2. **Statistics Verification**
   - Total Products: 1,247 displayed
   - Total Orders: 856 displayed
   - Revenue: $45,678 displayed
   - All icons properly rendered

3. **Layout Verification**
   - Responsive grid layout working
   - Cards properly styled
   - Welcome message displayed

**Expected Outcome:**
- Dashboard provides clear business overview
- All statistics accurately displayed
- Professional appearance maintained

**Success Criteria:**
- Dashboard loads in < 1 second
- All statistics display correctly
- Layout responsive on different screen sizes

### TS_DASH_002: Navigation Between Modules
- **Business Objective:** Verify seamless navigation between application sections
- **User Type:** Admin/Seller
- **Risk Level:** Low
- **Preconditions:**
  - User authenticated
  - All modules accessible

**Test Flow:**
1. **Navigation Testing**
   - Start at Dashboard
   - Navigate to Products section
   - Navigate to Orders section
   - Navigate to Profile section
   - (Admin only) Navigate to Admin section

2. **Route Verification**
   - Each section loads correctly
   - URL updates appropriately
   - Content displays properly

3. **Return Navigation**
   - Navigate back to Dashboard
   - Verify state maintained
   - Test browser back/forward buttons

**Expected Outcome:**
- Smooth navigation between all sections
- No broken links or loading errors
- Consistent user experience

**Success Criteria:**
- All navigation links functional
- Page transitions smooth
- No 404 or routing errors

---

## 💾 Data Management Scenarios

### TS_DATA_001: Data Persistence and Recovery
- **Business Objective:** Verify user data persists and can be recovered
- **User Type:** Any authenticated user
- **Risk Level:** High
- **Preconditions:**
  - User authenticated
  - Orders created

**Test Flow:**
1. **Data Creation**
   - User logs in
   - User creates 3 different orders
   - User navigates between sections

2. **Browser Actions**
   - User refreshes browser
   - User closes and reopens browser
   - User clears cache (except localStorage)

3. **Data Recovery**
   - User accesses application again
   - Verify authentication state restored
   - Verify all orders still available

**Expected Outcome:**
- All user data preserved across browser sessions
- No data loss during normal usage
- Consistent application state

**Success Criteria:**
- Authentication state persists
- All created orders recoverable
- No data corruption

### TS_DATA_002: Large Dataset Handling
- **Business Objective:** Verify system handles large amounts of order data
- **User Type:** Heavy system user
- **Risk Level:** Medium
- **Preconditions:**
  - User authenticated
  - System ready for load testing

**Test Flow:**
1. **Data Generation**
   - Create 50 orders programmatically
   - Vary order details (different products, quantities)
   - Monitor system performance

2. **Performance Verification**
   - Measure order creation time
   - Check localStorage storage efficiency
   - Verify data retrieval speed

3. **Data Integrity**
   - Verify all 50 orders stored correctly
   - Check for data corruption
   - Confirm unique order IDs

**Expected Outcome:**
- System handles large datasets efficiently
- Performance remains acceptable
- Data integrity maintained

**Success Criteria:**
- All orders stored successfully
- Performance degradation < 20%
- No data corruption or loss

---

## 🔒 Security and Error Handling Scenarios

### TS_SEC_001: Input Security Validation
- **Business Objective:** Verify system protects against malicious input
- **User Type:** Security tester
- **Risk Level:** High
- **Preconditions:**
  - Order creation form accessible
  - Security testing approved

**Test Flow:**
1. **XSS Attempt**
   - Enter script tags in customer name field
   - Enter HTML in email field
   - Submit form and verify sanitization

2. **SQL Injection Simulation**
   - Enter SQL-like strings in form fields
   - Verify proper handling (though no real database)

3. **Data Validation**
   - Test various invalid input formats
   - Verify all inputs properly validated

**Expected Outcome:**
- All malicious input properly sanitized
- No script execution occurs
- System remains secure

**Success Criteria:**
- No XSS vulnerabilities
- All inputs properly validated
- Security measures effective

### TS_SEC_002: Authentication Security
- **Business Objective:** Verify authentication system security
- **User Type:** Security tester
- **Risk Level:** High
- **Preconditions:**
  - Authentication system accessible

**Test Flow:**
1. **Token Security**
   - Verify token uniqueness
   - Check token format consistency
   - Test token manipulation resistance

2. **Session Security**
   - Test session timeout handling
   - Verify proper logout functionality
   - Check unauthorized access prevention

**Expected Outcome:**
- Authentication system secure for development
- Proper session management
- Unauthorized access prevented

**Success Criteria:**
- Tokens properly generated and managed
- Sessions secure and properly terminated
- Access control working correctly

---

## 🌐 Cross-Browser and Device Scenarios

### TS_BROWSER_001: Multi-Browser Compatibility
- **Business Objective:** Verify application works across different browsers
- **User Type:** End user on various browsers
- **Risk Level:** Medium
- **Preconditions:**
  - Multiple browsers available for testing

**Test Flow:**
1. **Chrome Testing**
   - Complete full user journey in Chrome
   - Test all major features
   - Verify UI rendering

2. **Firefox Testing**
   - Repeat same journey in Firefox
   - Compare functionality and appearance
   - Note any differences

3. **Edge Testing**
   - Test core functionality in Edge
   - Verify compatibility

**Expected Outcome:**
- Consistent functionality across browsers
- Similar user experience
- No browser-specific issues

**Success Criteria:**
- All features work in all tested browsers
- UI renders consistently
- No browser-specific errors

### TS_MOBILE_001: Mobile Device Usage
- **Business Objective:** Verify application usable on mobile devices
- **User Type:** Mobile user
- **Risk Level:** Medium
- **Preconditions:**
  - Mobile device or browser dev tools

**Test Flow:**
1. **Mobile Access**
   - Access application on mobile viewport
   - Test touch interactions
   - Verify layout adaptation

2. **Feature Testing**
   - Test emergency login on mobile
   - Test order creation on mobile
   - Verify all buttons accessible

3. **Usability Verification**
   - Check text readability
   - Verify touch target sizes
   - Test form input on mobile

**Expected Outcome:**
- Application fully functional on mobile
- Good user experience maintained
- All features accessible

**Success Criteria:**
- Mobile layout responsive
- All features work with touch
- Good usability on small screens

---

## 📊 Test Scenario Summary

### Scenario Categories
- **Authentication Scenarios:** 3 scenarios
- **Order Management Scenarios:** 3 scenarios  
- **Dashboard/Navigation Scenarios:** 2 scenarios
- **Data Management Scenarios:** 2 scenarios
- **Security Scenarios:** 2 scenarios
- **Cross-Browser/Device Scenarios:** 2 scenarios

### Risk Level Distribution
- **High Risk:** 8 scenarios (critical business functions)
- **Medium Risk:** 6 scenarios (important features)
- **Low Risk:** 0 scenarios

### Business Impact
- **Revenue Impact:** Order management scenarios
- **User Experience:** Authentication and navigation scenarios
- **Data Integrity:** Data management scenarios
- **Security:** Security validation scenarios
- **Accessibility:** Cross-browser and mobile scenarios

### Success Metrics
- **All scenarios should complete successfully**
- **Performance targets met for each scenario**
- **No critical errors or data loss**
- **Consistent user experience across scenarios**

---

*Test Scenarios Document v1.0 - Created June 13, 2025*  
*For use with Angular Inventory & Order Management System*
