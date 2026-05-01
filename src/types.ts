/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
  ADMIN = 'admin',
  MANAGER = 'manager'
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  photoURL?: string;
  createdAt: string;
  vendorId?: string; // For vendor-specific details if linked
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  parentId?: string; // For sub-categories
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  subCategory?: string;
  images: string[];
  stock: number;
  unit: string; // e.g., 'kg', 'pcs', 'gm'
  vendorId: string;
  rating: number;
  numReviews: number;
  createdAt: string;
  isFlashSale?: boolean;
  tags: string[];
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingCharge: number;
  discount?: number;
  status: OrderStatus;
  paymentMethod: 'COD' | 'BKASH' | 'NAGAD' | 'CARD';
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    area: string;
    city: string;
  };
  trackingId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}
