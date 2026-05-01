import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { useAuth } from './AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrorHandler';

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch from Firestore on login
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const docSnap = await getDoc(doc(db, 'wishlists', user.uid));
          if (docSnap.exists()) {
            const remoteItems = docSnap.data().items || [];
            if (remoteItems.length > 0) {
              setWishlist(remoteItems);
            }
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `wishlists/${user.uid}`);
        }
      }
    };
    fetchWishlist();
  }, [user]);

  // Sync with Firestore on change
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    const syncWithFirestore = async () => {
      if (user) {
        try {
          await setDoc(doc(db, 'wishlists', user.uid), {
            userId: user.uid,
            items: wishlist,
            updatedAt: serverTimestamp()
          });
        } catch (error) {
          console.error('Failed to sync wishlist:', error);
        }
      }
    };

    const timeout = setTimeout(syncWithFirestore, 1000);
    return () => clearTimeout(timeout);
  }, [wishlist, user]);

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
