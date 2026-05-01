import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center max-w-sm mx-auto"
        >
          <div className="w-24 h-24 bg-rose-50 rounded-[2rem] flex items-center justify-center mb-8 rotate-3">
            <Heart className="w-10 h-10 text-rose-500 fill-current" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Wishlist is empty</h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10">
            Save the items you love to your wishlist and we'll keep them safe for you!
          </p>
          <Link
            to="/shop"
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
          >
            Go Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 pb-32">
      <div className="flex items-center gap-4 mb-10">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Saved Items</h1>
        <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{wishlist.length} Saved</span>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {wishlist.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-5 p-5 bg-white border border-slate-50 rounded-3xl group hover:shadow-xl hover:shadow-slate-100 transition-all duration-300"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 shrink-0 p-3 flex items-center justify-center">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="flex flex-col gap-1 mb-3">
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{item.category}</span>
                  <Link to={`/product/${item.id}`} className="font-black text-slate-800 hover:text-emerald-600 transition-colors line-clamp-1 truncate">
                    {item.name}
                  </Link>
                  <p className="text-lg font-black text-slate-900 leading-none">৳{item.discountPrice || item.price}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToCart(item, 1)}
                    className="flex-grow py-2.5 bg-emerald-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] text-white">
        <h3 className="text-xl font-black mb-4 tracking-tighter">Wait for Price Drops?</h3>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed mb-8">
          Enable price drop notifications for your saved items to get the best deals.
        </p>
        <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all">
          Enable Notifications
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
