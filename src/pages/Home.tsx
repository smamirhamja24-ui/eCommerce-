import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  BadgePercent,
  Headphones
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { CATEGORIES, HERO_SLIDES } from '../constants';
import { productService } from '../services/productService';
import { Product } from '../types';

const getRecommendedProductsFromList = (list: Product[]) => {
  return [...list].sort(() => 0.5 - Math.random()).slice(0, 8);
};

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.getAllProducts();
      setProducts(data);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const recommendedProducts = useMemo(() => {
    if (products.length === 0) return [];
    return getRecommendedProductsFromList(products);
  }, [products]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Bazarify...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative overflow-hidden group">
        <div className="relative h-[480px] sm:h-[500px] lg:h-[600px] rounded-[3rem] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className={cn("absolute inset-0 transition-colors duration-1000", HERO_SLIDES[currentSlide].bg)}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-2/3 h-full bg-black/5 -skew-x-12 translate-x-1/3"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-white/10 rounded-full blur-[80px]"></div>

              <div className="absolute inset-0 flex items-center px-8 sm:px-14 lg:px-24">
                <div className="max-w-xl z-20 space-y-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-white border border-white/10"
                  >
                    <BadgePercent className="w-4 h-4 mr-2" />
                    {HERO_SLIDES[currentSlide].badge}
                  </motion.div>
                  
                  <div className="space-y-4">
                    <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-5xl sm:text-8xl font-black text-white leading-[0.95] tracking-tighter"
                    >
                      {HERO_SLIDES[currentSlide].title}<br />
                      <span className={HERO_SLIDES[currentSlide].accent}>{HERO_SLIDES[currentSlide].highlight}</span>
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-white/80 text-base sm:text-xl font-medium max-w-md"
                    >
                      {HERO_SLIDES[currentSlide].sub}
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-6"
                  >
                    <Link to="/shop" className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center gap-3 shadow-2xl shadow-black/20 active:scale-95 group">
                      Shop Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>

                {/* Hero Image Container */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center p-12">
                  <motion.div
                    key={`img-${currentSlide}`}
                    initial={{ opacity: 0, x: 100, rotate: 10 }}
                    animate={{ opacity: 1, x: 0, rotate: -5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <div className="absolute w-[80%] aspect-square bg-white/10 rounded-full blur-[100px] animate-pulse"></div>
                    <img 
                      src={HERO_SLIDES[currentSlide].image} 
                      alt="" 
                      className="w-full h-[60%] lg:h-[75%] object-contain drop-shadow-[0_45px_65px_rgba(0,0,0,0.3)] z-10 transition-transform duration-1000"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all active:scale-90"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all active:scale-90"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  currentSlide === i ? "w-10 bg-white" : "w-2 bg-white/30"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats / Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-12 relative z-30">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Truck className="w-6 h-6" />, title: 'Free Shipping', sub: 'Calculated at checkout' },
            { icon: <RotateCcw className="w-6 h-6" />, title: 'Easy Returns', sub: '30 days money back' },
            { icon: <ShieldCheck className="w-6 h-6" />, title: 'Secure Payment', sub: '100% secure processing' },
            { icon: <BadgePercent className="w-6 h-6" />, title: 'Best Deals', sub: 'Up to 70% flash sale' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center gap-4 hover:-translate-y-1 transition-transform cursor-default">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="text-left">
                <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-0.5 leading-none">{item.title}</h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">{item.sub}</p>
              </div>
            </div>
          ))}
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
          {CATEGORIES.slice(0, 8).map((cat, i) => (
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
          {products.filter(p => p.isFlashSale).map(product => (
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

      {/* Dynamic Category Sections */}
      {CATEGORIES.map((category) => {
        const categoryProducts = products.filter(p => p.category === category.name);
        if (categoryProducts.length === 0) return null;

        return (
          <section key={category.name} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-slate-700", category.color)}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">{category.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fresh from our {category.name.toLowerCase()} collection</p>
                </div>
              </div>
              <Link to={`/shop?category=${category.name}`} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline flex items-center gap-1">
                View All
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {categoryProducts.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Featured Products / All Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#fafafa] rounded-[3rem] my-10">
        <div className="flex justify-between items-center mb-12 px-4 sm:px-8">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Recommendation for You</h3>
          <Link to="/shop" className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 flex items-center gap-2 group transition-colors">
            Explore More
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-8">
          {recommendedProducts.map(product => (
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
