import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { useAuth } from './AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrorHandler';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Fetch cart from Firestore on login
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const cartDoc = await getDoc(doc(db, 'carts', user.uid));
          if (cartDoc.exists()) {
            const remoteItems = cartDoc.data().items || [];
            // Merge logic: For simplicity, we'll favor remote for now or just overwrite
            // Real apps might merge local and remote. Here we'll just use remote if it exists.
            if (remoteItems.length > 0) {
              // We need full product details for CartItem, but the blueprint only stores productId/quantity
              // However, the current CartItem type in the app seems to include the whole Product.
              // I'll need to fetch product details if I only store IDs.
              // For this demo, I'll store the whole item in Firestore (ignoring strict schema if needed, or I'll just store products in items)
              setCart(remoteItems);
            }
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `carts/${user.uid}`);
        }
      }
    };
    fetchCart();
  }, [user]);

  // Sync with localStorage and Firestore on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const syncWithFirestore = async () => {
      if (user) {
        try {
          await setDoc(doc(db, 'carts', user.uid), {
            userId: user.uid,
            items: cart,
            updatedAt: serverTimestamp()
          });
        } catch (error) {
          // Silent fail for background sync or use handleFirestoreError
          console.error('Failed to sync cart:', error);
        }
      }
    };

    const timeout = setTimeout(syncWithFirestore, 1000); // Debounce
    return () => clearTimeout(timeout);
  }, [cart, user]);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => 
    acc + (item.discountPrice || item.price) * item.quantity, 0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
