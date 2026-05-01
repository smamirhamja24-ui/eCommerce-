import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrorHandler';

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'customer' | 'vendor' | 'admin' | 'manager';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any; 
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data() as UserProfile;
            // Force admin role for the developer to ensure they can manage the site
            if (user.email === 'smamirhamja24@gmail.com' && data.role !== 'admin') {
              const updatedProfile = { ...data, role: 'admin' as const };
              await setDoc(doc(db, 'users', user.uid), updatedProfile, { merge: true });
              setProfile(updatedProfile);
            } else {
              setProfile(data);
            }
          } else {
            // Create initial profile
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              role: user.email === 'smamirhamja24@gmail.com' ? 'admin' : 'customer',
              createdAt: serverTimestamp(),
            };
            await setDoc(doc(db, 'users', user.uid), newProfile);
            setProfile(newProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Logout Error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
