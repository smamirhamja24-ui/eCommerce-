import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Package, 
  Users, 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Search,
  Filter,
  MoreVertical,
  X,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { Product } from '../types';
import { db } from '../lib/firebase';
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

export const AdminDashboard: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: 'Groceries',
    image: 'https://images.unsplash.com/photo-1542838132-92c5332bd491?q=80&w=2574&auto=format&fit=crop',
    stock: 100,
    unit: 'kg',
    description: '',
    rating: 4.5,
    reviews: 0
  });

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) {
      navigate('/');
    }
  }, [user, profile, loading, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.getAllProducts();
      setProducts(data);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        setProducts(prev => prev.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productId = 'prod-' + Date.now();
      const productToAdd = {
        ...newProduct,
        id: productId,
        vendorId: user?.uid,
        createdAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'products', productId), productToAdd);
      setProducts(prev => [productToAdd as unknown as Product, ...prev]);
      setIsAddModalOpen(false);
      setNewProduct({
        name: '',
        price: 0,
        category: 'Groceries',
        image: 'https://images.unsplash.com/photo-1542838132-92c5332bd491?q=80&w=2574&auto=format&fit=crop',
        stock: 100,
        unit: 'kg',
        description: '',
        rating: 4.5,
        reviews: 0
      });
    } catch (error) {
      console.error('Add failed:', error);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight leading-none mb-3">Admin Panel</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Manage products, orders and users
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Revenue', value: '$45,231', icon: <BarChart3 />, color: 'emerald' },
          { label: 'Active Products', value: products.length, icon: <Package />, color: 'blue' },
          { label: 'Total Orders', value: '1,284', icon: <ShoppingBag />, color: 'rose' },
          { label: 'Registered Users', value: '842', icon: <Users />, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 flex items-center gap-6 group hover:border-emerald-100 transition-all">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Product List Table */}
      <div className="bg-white rounded-[2.5rem] border-2 border-slate-50 overflow-hidden">
        <div className="p-8 border-b-2 border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase tracking-widest">Inventory Management</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="pl-11 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 w-full md:w-64"
              />
            </div>
            <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-50">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img src={product.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                      <div>
                        <p className="text-sm font-black text-slate-800 tracking-tight leading-tight mb-1">{product.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-800 tracking-tight">${product.price}</p>
                    <p className="text-[10px] text-slate-400 font-bold tracking-widest">per {product.unit}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${product.stock > 20 ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}></div>
                       <p className="text-sm font-black text-slate-800 tracking-tight">{product.stock}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Check className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Published</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-3 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] w-full max-w-xl p-10 relative shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-8 right-8 p-3 bg-slate-50 rounded-2xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-8 uppercase tracking-widest">Add Product</h2>

            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-4">Product Name</label>
                  <input 
                    required
                    type="text" 
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-emerald-500" 
                    placeholder="e.g. Fresh Organic Apples"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-4">Price ($)</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-emerald-500" 
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-4">Category</label>
                <select 
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 appearance-none"
                >
                  <option>Groceries</option>
                  <option>Fruits & Veggies</option>
                  <option>Snacks</option>
                  <option>Meat & Fish</option>
                  <option>Dairy & Eggs</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-4">Stock Quantity</label>
                  <input 
                    type="number" 
                    value={newProduct.stock}
                    onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-emerald-500" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-4">Unit</label>
                  <input 
                    type="text" 
                    value={newProduct.unit}
                    onChange={e => setNewProduct({...newProduct, unit: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-emerald-500" 
                    placeholder="e.g. kg, pcs, pack"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-4">Image URL</label>
                <input 
                  type="text" 
                  value={newProduct.image}
                  onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-emerald-500" 
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-600 text-white py-5 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-600/20 active:scale-95 transition-all mt-4"
              >
                Create Product Listing
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
