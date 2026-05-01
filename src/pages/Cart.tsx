import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const total = subtotal;

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 mx-auto">
          <ShoppingBag className="w-8 h-8 text-slate-300" />
        </div>
        <h2 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-widest">Your Cart is Empty</h2>
        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed mb-10">
          Looks like you haven't added<br />anything yet
        </p>
        <Link
          to="/"
          className="inline-block px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 active:scale-95 transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 pb-32">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase mb-2">Cart ({totalItems})</h1>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Review your items before checkout</p>
      </div>

      <div className="space-y-4 mb-10">
        {cart.map((item) => (
          <div key={item.id} className="p-4 bg-white border border-slate-100 rounded-[2rem] flex gap-4 relative group">
            <div className="w-24 h-24 bg-slate-50 rounded-2xl p-3 shrink-0 flex items-center justify-center">
              <img src={item.images[0]} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="flex-grow pt-1">
              <h3 className="text-[13px] font-black text-slate-800 uppercase tracking-tight line-clamp-1 mb-1">{item.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">৳{(item.discountPrice || item.price).toLocaleString()}</p>
              <div className="flex items-center bg-slate-50 rounded-xl p-1 w-fit">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 text-slate-400"><Minus className="w-3 h-3 stroke-[3px]" /></button>
                <span className="w-8 text-center font-black text-[11px]">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 text-slate-400"><Plus className="w-3 h-3 stroke-[3px]" /></button>
              </div>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {/* Promo Code */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Apply Promo Code" 
            className="w-full px-6 py-5 bg-white border border-slate-100 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs font-black uppercase tracking-widest placeholder:text-slate-300"
          />
          <button className="absolute right-2 top-2 bottom-2 px-6 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Apply</button>
        </div>

        {/* Totals */}
        <div className="p-6 bg-white border border-slate-100 rounded-[2rem] space-y-4">
          <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
            <span>Subtotal</span>
            <span className="text-slate-800">৳{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
            <span>Shipping</span>
            <span className="text-emerald-600">Free</span>
          </div>
          <div className="pt-4 border-t border-slate-50 flex justify-between items-end">
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1">Total Payable</span>
            <span className="text-3xl font-black text-emerald-600 tracking-tighter">৳{total.toLocaleString()}</span>
          </div>
        </div>

        <Link
          to="/checkout"
          className="block w-full py-5 bg-emerald-600 text-white text-center rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 active:scale-95 transition-all"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

