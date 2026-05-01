import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Send, ShoppingBag } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">Shopora</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              The ultimate multi-vendor shopping destination. Quality products, secure payments, and worldwide delivery.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] mb-8">Navigation</h3>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li><Link to="/shop" className="hover:text-emerald-500 transition-colors">All Products</Link></li>
              <li><Link to="/arrivals" className="hover:text-emerald-500 transition-colors">New Arrivals</Link></li>
              <li><Link to="/best-sellers" className="hover:text-emerald-500 transition-colors">Best Sellers</Link></li>
              <li><Link to="/track" className="hover:text-emerald-500 transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] mb-8">Help Center</h3>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li><Link to="/contact" className="hover:text-emerald-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-500 transition-colors">FAQs</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Newsletter</h3>
            <p className="text-sm text-slate-400">Subscribe to get special offers and once-in-a-lifetime deals.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button className="absolute right-1 top-1 h-10 w-10 bg-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-colors">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">
            © 2024 SHOPORA. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 grayscale opacity-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};
