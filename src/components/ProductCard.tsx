import React from 'react';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  const isFavorited = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-100 transition-all duration-700 flex flex-col h-full relative"
    >
      {/* Badges Overlay */}
      {discountPercentage > 0 && (
        <span className="absolute top-4 left-4 z-10 bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter shadow-xl shadow-rose-500/20">
          -{discountPercentage}%
        </span>
      )}

      {/* Heart Action */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        className={cn(
          "absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 drop-shadow-sm",
          isFavorited 
            ? "bg-rose-50 text-rose-500" 
            : "bg-white/80 backdrop-blur-md text-slate-400 hover:text-emerald-600 shadow-sm"
        )}
      >
        <Heart className={cn("w-4 h-4 transition-transform group-hover:scale-110", isFavorited && "fill-current")} />
      </button>

      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden bg-slate-50/20 p-6 flex items-center justify-center">
        <Link to={`/product/${product.id}`} className="w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-5 pt-2 flex flex-col flex-grow">
        <div className="flex flex-col gap-1 mb-3">
          <h3 className="text-sm font-black text-slate-800 line-clamp-1 hover:text-emerald-600 transition-colors tracking-tight">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          
          <div className="flex items-center gap-1.5 grayscale opacity-60">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-2.5 h-2.5 fill-current",
                    i < Math.floor(product.rating || 4.5) ? "text-yellow-400" : "text-slate-200"
                  )}
                />
              ))}
            </div>
            <span className="text-[10px] font-black text-slate-500 tracking-widest">({product.numReviews})</span>
          </div>
        </div>

        {/* Price & Cart */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1 grayscale opacity-50">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-2 h-2 fill-current",
                      i < Math.floor(product.rating || 4.5) ? "text-yellow-400" : "text-slate-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-[8px] font-black text-slate-400 tracking-widest">{product.rating}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-slate-900 tracking-tighter">
                ৳{product.discountPrice || product.price}
              </span>
              {product.discountPrice && (
                <span className="text-[10px] text-slate-300 line-through font-bold">
                  ৳{product.price}
                </span>
              )}
            </div>
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            className="w-10 h-10 bg-emerald-600 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-700 active:scale-95 transition-all shadow-lg shadow-emerald-600/10"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};


