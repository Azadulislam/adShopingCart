import { useState } from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import { useCart } from './context/useCart';
import products from './data/products';
import './App.css';

function App() {
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <div className="app">
      <Navbar cartCount={getTotalItems()} onCartClick={openCart} />
      <main className="app-main">
        <ProductGrid products={products} />
      </main>
      <Cart isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
}

export default App;
