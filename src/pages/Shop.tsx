import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, Grid, List, ChevronDown, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { cn } from '../lib/utils';
import { CATEGORIES } from '../constants';
import { productService } from '../services/productService';
import { Product } from '../types';

const CATEGORY_NAMES = ['All', ...CATEGORIES.map(c => c.name)];

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Default');

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.getAllProducts();
      setProducts(data);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - (a.discountPrice || a.price) - (b.price - (b.discountPrice || b.price)); // Simple logic
      // Corrected price sort (prefer discount price)
      const getPrice = (p: Product) => p.discountPrice || p.price;
      if (sortBy === 'Price: Low to High') return getPrice(a) - getPrice(b);
      if (sortBy === 'Price: High to Low') return getPrice(b) - getPrice(a);
      if (sortBy === 'Rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Discovering fresh items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Shop All Products</h1>
          <p className="text-gray-500">Discover fresh essentials for your home</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full sm:w-64 pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold md:hidden shadow-sm"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="flex gap-12">
        {/* Sidebar Filter - Desktop */}
        <aside className="hidden md:block w-64 space-y-10 shrink-0">
          <div>
            <h3 className="font-black text-gray-900 text-lg mb-6">Categories</h3>
            <div className="space-y-2">
              {CATEGORY_NAMES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-between group",
                    selectedCategory === cat ? "bg-green-600 text-white shadow-lg shadow-green-600/20" : "text-gray-600 hover:bg-green-50"
                  )}
                >
                  {cat}
                  {selectedCategory === cat && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black text-gray-900 text-lg mb-6">Price Range</h3>
            <div className="space-y-4">
              <input type="range" className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
              <div className="flex justify-between text-xs font-bold text-gray-500">
                <span>0 BDT</span>
                <span>5000+ BDT</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-grow">
          {/* Sorting & Stats */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <p className="text-gray-500 text-sm font-medium">
              Showing <span className="text-gray-900 font-bold">{filteredProducts.length}</span> products
            </p>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl text-sm font-bold text-gray-900 hover:bg-gray-50 transition-colors">
                  <span>Sort by: {sortBy}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {['Default', 'Price: Low to High', 'Price: High to Low', 'Rating'].map(option => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className="w-full text-left px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-50 hover:text-green-600 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button className="p-2 bg-white rounded-lg shadow-sm"><Grid className="w-4 h-4" /></button>
                <button className="p-2 text-gray-400"><List className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-200" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          ></motion.div>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="relative w-80 bg-white h-full p-8 shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <h3 className="font-black text-2xl">Filters</h3>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-10 overflow-y-auto pr-2 custom-scrollbar">
              <div>
                <h4 className="font-bold mb-4 uppercase text-[10px] tracking-widest text-gray-400">Categories</h4>
                <div className="grid grid-cols-1 gap-2">
                  {CATEGORY_NAMES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setIsSidebarOpen(false); }}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl font-bold transition-all",
                        selectedCategory === cat ? "bg-green-600 text-white" : "bg-gray-50 text-gray-600"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4 uppercase text-[10px] tracking-widest text-gray-400">Price Range</h4>
                <div className="space-y-4">
                  <input type="range" className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-600" />
                  <div className="flex justify-between text-xs font-bold text-gray-500 uppercase">
                    <span>0 BDT</span>
                    <span>5000+ BDT</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="w-full py-4 bg-green-600 text-white rounded-2xl font-black shadow-xl shadow-green-600/20"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
