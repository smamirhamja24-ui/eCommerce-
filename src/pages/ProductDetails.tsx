import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  ChevronRight,
  Plus,
  Minus,
  Heart,
  Share2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types';

export const ProductDetails: React.FC = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black');
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Sony headphones data from image
  const product: Product = {
    id: 'headphones-1',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: `Industry-leading noise canceling
30-hour battery life
Crystal clear call quality
Quick charge: 3 min = 3 hours play`,
    price: 29999,
    discountPrice: 22999,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1618366712010-8c0e2718e99e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 50,
    unit: '1 unit',
    vendorId: 'v1',
    rating: 4.6,
    numReviews: 102,
    createdAt: new Date().toISOString(),
    tags: []
  };

  const colors = ['Black', 'White', 'Blue'];

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    if (type === 'inc' && quantity < product.stock) setQuantity(quantity + 1);
    if (type === 'dec' && quantity > 1) setQuantity(quantity - 1);
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="bg-white pb-32">
      {/* Header Row */}
      <div className="max-w-xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/categories" className="p-2.5 bg-slate-50 text-slate-400 rounded-xl">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </Link>
        <h1 className="text-sm font-black text-slate-800 uppercase tracking-widest">Product Details</h1>
        <div className="flex gap-2">
          <button onClick={() => toggleWishlist(product)} className={cn("p-2.5 rounded-xl transition-all", isFavorited ? "bg-rose-50 text-rose-500" : "bg-slate-50 text-slate-400")}>
            <Heart className={cn("w-5 h-5", isFavorited && "fill-current")} />
          </button>
          <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4">
        {/* Main Image */}
        <div className="flex gap-4 mb-8">
          <div className="flex flex-col gap-3">
            {product.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImage(i)}
                className={cn(
                  "w-16 h-16 rounded-xl border-2 overflow-hidden p-2 bg-slate-50 transition-all",
                  activeImage === i ? "border-emerald-600" : "border-transparent"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
          <div className="flex-grow aspect-square rounded-[2rem] bg-slate-50 flex items-center justify-center p-8 overflow-hidden">
            <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-black text-slate-800 leading-tight">{product.name}</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{product.rating} ({product.numReviews} Reviews)</span>
              </div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                In Stock
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-800 tracking-tighter">৳{product.discountPrice.toLocaleString()}</span>
              <span className="text-sm text-slate-300 line-through font-bold">৳{product.price.toLocaleString()}</span>
              <span className="px-2 py-0.5 bg-rose-50 text-rose-500 text-[9px] font-black uppercase tracking-widest rounded">-{Math.round((1 - product.discountPrice/product.price) * 100)}%</span>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-50">
            <ul className="space-y-2">
              {product.description.split('\n').map((line, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                  <div className="w-1 h-1 bg-slate-300 rounded-full mt-1.5" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-50">
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Color: {selectedColor}</h3>
              <div className="flex gap-3">
                {['#000000', '#F5F5F5', '#1E3A8A'].map((c, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedColor(colors[i])}
                    className={cn(
                      "w-8 h-8 rounded-full border-4 transition-all",
                      selectedColor === colors[i] ? "border-emerald-100" : "border-transparent"
                    )}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quantity</h3>
              <div className="flex items-center bg-slate-50 rounded-xl p-1 w-fit">
                <button onClick={() => handleQuantityChange('dec')} className="p-2 text-slate-400"><Minus className="w-4 h-4 stroke-[3px]" /></button>
                <span className="w-10 text-center font-black text-sm">{quantity}</span>
                <button onClick={() => handleQuantityChange('inc')} className="p-2 text-slate-400"><Plus className="w-4 h-4 stroke-[3px]" /></button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <button 
              onClick={() => addToCart(product, quantity)}
              className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 active:scale-95 transition-all"
            >
              Add to Cart
            </button>
            <button className="w-full py-5 bg-white border-2 border-emerald-600 text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// End of file cleanup
