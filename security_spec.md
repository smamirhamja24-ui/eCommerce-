# Security Specification for Bazarify

## Data Invariants
1. A user can only read and write their own profile data (unless they are an admin).
2. Products can be read by anyone, but only vendors (for their own products) or admins can write/update them.
3. Orders can be created by any signed-in user, but users can only read their own orders.
4. Admins can manage all collections.
5. Order status can only be advanced by authorized roles (admins/managers).

## The Dirty Dozen Payloads (Rejection Targets)
1. **Unauthorized User Profile Write**: Attempt to write to `/users/other-uid` as a different user.
2. **Product Price Injection**: A non-vendor user attempting to update a product price.
3. **Invalid Order Status**: A customer attempting to set their own order status to 'delivered' during creation.
4. **Identity Spoofing**: Attempting to create an order with a `userId` that doesn't match the authenticated user.
5. **Shadow Field Injection**: Adding an `isAdmin: true` field to a user profile during registration.
6. **Negative Stock**: Creating a product with `stock: -10`.
7. **Invalid Pricing**: Creating a product with a negative price.
8. **Malicious ID**: Attempting to create a document with a 1MB string as the ID.
9. **Bypass Role Check**: Attempting to update a product without being a vendor or admin.
10. **Unauthorized Order Read**: Attempting to read another user's order details.
11. **Timestamp Forgery**: Providing a client-side `createdAt` timestamp instead of `request.time`.
12. **Status Skipping**: Attempting to update an order status from 'pending' to 'delivered' directly (if restricted state transitions were implemented, though here we'll focus on role-based).

## Test Runner (Conceptual skip, focusing on rules generation)
(Skipping the actual .ts file for now to focus on the rules implementation as requested in the workflow, but the invariants guide the rules).
