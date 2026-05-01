import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrorHandler';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

const PRODUCTS_COLLECTION = 'products';

export const productService = {
  // Get all products
  async getAllProducts(): Promise<Product[]> {
    try {
      const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      
      // Seed if empty (for demo purposes)
      if (products.length === 0) {
        await this.seedProducts();
        return this.getAllProducts();
      }
      
      return products;
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, PRODUCTS_COLLECTION);
      return [];
    }
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const q = query(
        collection(db, PRODUCTS_COLLECTION), 
        where('category', '==', category)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, PRODUCTS_COLLECTION);
      return [];
    }
  },

  // Get single product
  async getProductById(id: string): Promise<Product | null> {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Product;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${PRODUCTS_COLLECTION}/${id}`);
      return null;
    }
  },

  // Seed initial products from MOCK_PRODUCTS
  async seedProducts() {
    try {
      console.log('Seeding products...');
      for (const product of MOCK_PRODUCTS) {
        const { id, ...productData } = product;
        await setDoc(doc(db, PRODUCTS_COLLECTION, id), {
          ...productData,
          createdAt: serverTimestamp()
        });
      }
      console.log('Seeding complete');
    } catch (error) {
      console.error('Error seeding products:', error);
    }
  }
};
