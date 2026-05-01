import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  ArrowRight, 
  ChevronRight, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  BadgePercent,
  Headphones,
  Shirt,
  Home as HomeIcon,
  Sparkles,
  Trophy,
  Gamepad2,
  Watch,
  Book,
  Smartphone
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { Link } from 'react-router-dom';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Smart Watch Series 9 - 45mm GPS',
    description: 'Advanced features for health and fitness.',
    price: 5999,
    discountPrice: 4799,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=500'],
    stock: 50,
    unit: '1 unit',
    vendorId: 'v1',
    rating: 4.8,
    numReviews: 128,
    createdAt: new Date().toISOString(),
    isFlashSale: true,
    tags: [],
  },
  {
    id: '2',
    name: 'Wireless Earbuds Pro with Noise Cancelling',
    description: 'Crystal clear sound with long battery life.',
    price: 2999,
    discountPrice: 2549,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=500'],
    stock: 20,
    unit: '1 pair',
    vendorId: 'v1',
    rating: 4.5,
    numReviews: 96,
    createdAt: new Date().toISOString(),
    isFlashSale: true,
    tags: [],
  },
  {
    id: '3',
    name: 'Urban Backpack - Water Resistant',
    description: 'Perfect for daily commute and travel.',
    price: 1899,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb94c6a62?auto=format&fit=crop&q=80&w=500'],
    stock: 15,
    unit: '1 unit',
    vendorId: 'v2',
    rating: 4.9,
    numReviews: 64,
    createdAt: new Date().toISOString(),
    tags: [],
  },
  {
    id: '4',
    name: 'Luxury Perfume - Signature Scents 100ml',
    description: 'Elegant and long-lasting floral fragrance.',
    price: 2999,
    discountPrice: 2249,
    category: 'Beauty',
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=500'],
    stock: 10,
    unit: '100ml',
    vendorId: 'v1',
    rating: 4.7,
    numReviews: 75,
    createdAt: new Date().toISOString(),
    isFlashSale: true,
    tags: [],
  }
];

const CATEGORIES = [
  { name: 'Electronics', icon: <Headphones className="w-6 h-6" />, color: 'bg-indigo-50' },
  { name: 'Fashion', icon: <Shirt className="w-6 h-6" />, color: 'bg-red-50' },
  { name: 'Home & Living', icon: <HomeIcon className="w-6 h-6" />, color: 'bg-amber-50' },
  { name: 'Beauty', icon: <Sparkles className="w-6 h-6" />, color: 'bg-emerald-50' },
  { name: 'Sports', icon: <Trophy className="w-6 h-6" />, color: 'bg-blue-50' },
  { name: 'Toys & Games', icon: <Gamepad2 className="w-6 h-6" />, color: 'bg-orange-50' },
  { name: 'Accessories', icon: <Watch className="w-6 h-6" />, color: 'bg-slate-50' },
  { name: 'Books', icon: <Book className="w-6 h-6" />, color: 'bg-rose-50' },
];

export const Home: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 8, m: 24, s: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Flash Offer Strip */}
      <div className="bg-primary py-2 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <motion.span 
              animate={{ opacity: [1, 0.5, 1] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="px-2 py-0.5 bg-yellow-400 text-dark text-[10px] font-black rounded uppercase tracking-tighter"
            >
              🔥 Eid Mega Sale
            </motion.span>
            <p className="text-white text-[11px] font-bold uppercase tracking-widest">Up to 70% OFF | Free Delivery Over ৳999</p>
          </div>
          <div className="flex items-center gap-4 text-white font-black text-[11px] tracking-widest">
            <span className="opacity-50">ENDS IN:</span>
            <div className="flex gap-2">
              <span className="bg-white/10 px-2 py-1 rounded">0{timeLeft.h}h</span>
              <span className="bg-white/10 px-2 py-1 rounded">{timeLeft.m}m</span>
              <span className="bg-white/10 px-2 py-1 rounded">{timeLeft.s}s</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/4 h-full bg-white/5 -skew-x-12 translate-x-1/2"></div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Content Left */}
          <div className="lg:col-span-12 xl:col-span-6 space-y-10 order-2 xl:order-1 mt-12 lg:mt-0">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[11px]"
              >
                <div className="w-12 h-0.5 bg-primary"></div>
                Premium Shopping Experience
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl sm:text-7xl font-black text-dark leading-[1.1] tracking-tight"
              >
                বাংলাদেশের স্মার্ট <span className="text-primary">শপিং</span> এখন আরও সহজ
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 text-lg sm:text-xl font-medium max-w-lg leading-relaxed"
              >
                Original products, best price, cash on delivery, fast delivery all over Bangladesh.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 sm:items-center"
            >
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl shadow-primary/20">
                <button className="px-12 py-5 bg-primary text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 relative z-10 transition-all group-hover:bg-primary-hover active:scale-95">
                  এখনই কিনুন
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
              </div>
              <button className="px-10 py-5 bg-white border border-slate-200 text-dark rounded-2xl font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all hover:bg-slate-50">
                অফার দেখুন
              </button>
            </motion.div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">দেশের মানুষের জন্য বিশ্বমানের অনলাইন শপিং</p>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {[
                  { icon: Truck, label: '64 District' },
                  { icon: RotateCcw, label: 'Easy Return' },
                  { icon: ShieldCheck, label: 'Secure' },
                  { icon: Headphones, label: '24/7 Support' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 grayscale group cursor-default">
                    <item.icon className="w-4 h-4 text-primary group-hover:grayscale-0 transition-all" />
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Right */}
          <div className="lg:col-span-12 xl:col-span-6 relative order-1 xl:order-2">
            <div className="relative aspect-square w-full sm:w-[500px] lg:w-[600px] mx-auto group">
              {/* Decorative shapes */}
              <div className="absolute inset-0 bg-surface-50 rounded-[4rem] group-hover:rotate-2 transition-transform duration-700"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-[80px]"></div>
              
              {/* Main Visual Elements */}
              <div className="relative w-full h-full p-8 flex items-center justify-center">
                {/* Floating Products */}
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 left-10 w-24 h-24 bg-white p-4 rounded-3xl shadow-2xl z-20"
                >
                  <Watch className="w-full h-full text-indigo-200" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 20, 0], rotate: [2, -2, 2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-20 right-10 w-28 h-28 bg-white p-5 rounded-[2.5rem] shadow-2xl z-20"
                >
                  <Smartphone className="w-full h-full text-emerald-200" />
                </motion.div>

                <div className="relative z-10 w-full h-full rounded-[3.5rem] overflow-hidden bg-white shadow-inner flex items-center justify-center p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200" 
                    alt="Premium Shopper"
                    className="w-full h-full object-cover rounded-[3rem] group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Delivery Rider Element */}
                <div className="absolute -bottom-6 -left-6 bg-dark p-6 rounded-[2.5rem] shadow-2xl z-30 flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                    <Truck className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fast Delivery</p>
                    <p className="text-white font-black text-sm tracking-tight leading-none">Nationwide</p>
                  </div>
                </div>

                {/* Stats Tag */}
                <div className="absolute top-20 -right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl z-30">
                  <div className="flex -space-x-2 mb-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
                    ))}
                  </div>
                  <p className="text-[10px] font-black text-dark uppercase tracking-tighter">1M+ Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Stats & Category Chips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 border-t border-slate-50 pt-10">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide w-full lg:w-auto">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest shrink-0">Popuar:</span>
            {['Electronics', 'Fashion', 'Grocery', 'Beauty', 'Home'].map((cat, i) => (
              <Link 
                key={i} 
                to={`/shop?category=${cat.toLowerCase()}`}
                className="px-5 py-2.5 bg-slate-50 hover:bg-primary hover:text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0"
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-10">
            {[
              { val: '1M+', label: 'Customers' },
              { val: '10K+', label: 'Products' },
              { val: '24/7', label: 'Support' }
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <p className="text-2xl font-black text-dark tracking-tighter leading-none">{stat.val}</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-black text-slate-800 tracking-tight">Shop by Category</h3>
          <Link to="/categories" className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline flex items-center gap-1 transition-all">
            View All
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-8">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={i}
              to={`/shop?category=${cat.name}`}
              className="group cursor-pointer flex flex-col items-center gap-3"
            >
              <div className={cn("w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-slate-600 transition-all group-hover:shadow-lg group-hover:shadow-slate-100 group-hover:-translate-y-1 duration-300", cat.color)}>
                {React.cloneElement(cat.icon as React.ReactElement, { className: "w-6 h-6 sm:w-7 sm:h-7" })}
              </div>
              <span className="text-[9px] sm:text-[10px] font-black text-slate-500 group-hover:text-emerald-600 transition-colors uppercase tracking-widest text-center leading-tight">
                {cat.name.split(' ')[0]}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-black text-slate-800 tracking-tight">Flash Deals</h3>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 rounded-lg">
              <span className="text-[10px] font-black uppercase tracking-widest">Ending In: 08:24:12</span>
            </div>
          </div>
          <Link to="/shop" className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline flex items-center gap-1 transition-all">
            View All
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {MOCK_PRODUCTS.filter(p => p.isFlashSale).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Smartphone Deals', sub: 'Up to 40% Off', bg: 'bg-[#f2f7f2]', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=500' },
          { title: 'New Arrivals', sub: 'Just Landed!', bg: 'bg-[#f0f4f9]', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=500' },
          { title: 'Beauty Essentials', sub: 'Up to 30% Off', bg: 'bg-[#f9f2f2]', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=500' }
        ].map((banner, i) => (
          <div key={i} className={cn("h-52 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center", banner.bg)}>
            <div className="relative z-10 space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{banner.title}</p>
              <h4 className="text-2xl font-black text-slate-800 leading-tight">{banner.sub}</h4>
              <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest border-b-2 border-emerald-600 pb-0.5 hover:text-emerald-700 transition-colors">
                Shop Now
              </button>
            </div>
            <img src={banner.img} alt={banner.title} className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-48 h-48 object-contain mix-blend-multiply opacity-80" />
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#fafafa] rounded-[3rem]">
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Featured Products</h3>
          <Link to="/shop" className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 flex items-center gap-2 group transition-colors">
            View All Products
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Bottom Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 divide-y divide-gray-100">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
          {[
            { icon: <ShieldCheck className="w-8 h-8" />, title: '100% Secure Payment', desc: 'Secure payment gateway' },
            { icon: <RotateCcw className="w-8 h-8" />, title: 'Money Back Guarantee', desc: '7 days money back' },
            { icon: <Headphones className="w-8 h-8" />, title: '24/7 Customer Support', desc: 'Fast online support' },
            { icon: <BadgePercent className="w-8 h-8" />, title: 'Member Discounts', desc: 'Special offers for users' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="text-left">
                <h5 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-tight">{item.title}</h5>
                <p className="text-[10px] sm:text-xs text-slate-400 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Brand Logos */}
        <div className="pt-16">
          <p className="text-center text-[10px] sm:text-xs font-black text-slate-300 uppercase tracking-[0.2em] mb-10">Trusted by Thousands of Customers</p>
          <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-16 lg:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all">
            {['SAMSUNG', 'APPLE', 'SONY', 'NIKE', 'PHILIPS', 'BOSCH', 'HP', 'ZARA'].map((brand, i) => (
              <span key={i} className="text-xl sm:text-3xl font-black italic tracking-tighter text-slate-900">{brand}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
