import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './common/Navbar';
import { Footer } from './common/Footer';
import { BottomNav } from './common/BottomNav';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};
