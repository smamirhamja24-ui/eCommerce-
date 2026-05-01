import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, ShoppingCart, Heart, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { cn } from '../../lib/utils';

export const BottomNav: React.FC = () => {
  const { totalItems } = useCart();

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/categories', icon: Grid, label: 'Categories' },
    { to: '/cart', icon: ShoppingCart, label: 'Cart', badge: totalItems },
    { to: '/wishlist', icon: Heart, label: 'Wishlist' },
    { to: '/account', icon: User, label: 'Account' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2 z-50 flex justify-around items-center h-16 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className="flex flex-col items-center justify-center gap-1 transition-all duration-300 relative no-underline"
        >
          {({ isActive }) => (
            <>
              <div className={cn("relative transition-colors duration-300", isActive ? "text-emerald-600" : "text-slate-400")}>
                <item.icon className="w-5 h-5 stroke-[2px]" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-emerald-600 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={cn("text-[10px] font-black uppercase tracking-tighter transition-colors duration-300", isActive ? "text-emerald-600" : "text-slate-400")}>
                {item.label}
              </span>
              
              {/* Active Indicator dot */}
              <div
                className={cn(
                  "absolute -bottom-1.5 w-1 h-1 rounded-full bg-emerald-600 transition-all duration-300 transform",
                  isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                )}
              />
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};
