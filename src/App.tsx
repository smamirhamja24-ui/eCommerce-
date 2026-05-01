import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Shop } from './pages/Shop';
import { Login } from './pages/Login';
import { Checkout } from './pages/Checkout';
import { OrderTracking } from './pages/OrderTracking';
import { Categories } from './pages/Categories';
import { Account } from './pages/Account';
import { Wishlist } from './pages/Wishlist';
import { OrderSuccess } from './pages/OrderSuccess';
import { HelpSupport } from './pages/HelpSupport';
import { Orders } from './pages/Orders';
import { OrderDetails } from './pages/OrderDetails';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="categories" element={<Categories />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="track" element={<OrderTracking />} />
        <Route path="orders" element={<Orders />} />
        <Route path="order/:id" element={<OrderDetails />} />
        <Route path="help" element={<HelpSupport />} />
        <Route path="account" element={<Account />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Login />} />
      </Route>
    </Routes>
  );
}
