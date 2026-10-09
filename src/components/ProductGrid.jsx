import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import ProductDetails from './ProductDetails';
import { useCart } from '../context/useCart';
import './ProductGrid.css';

function ProductGrid({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const categories = useMemo(() => {
    if (!products) return [];
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...unique.sort()];
  }, [products]);

  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <section id="products" className="product-grid-section">
      <div className="product-grid-header">
        <p className="product-grid-eyebrow">Discover</p>
        <h1 className="product-grid-title">Our Products</h1>
        <p className="product-grid-subtitle">
          Handpicked selection of premium items across {categories.length - 1}{' '}
          categories
        </p>
      </div>

      <div className="product-grid-categories">
        {categories.map((category) => (
          <span key={category} className="category-chip">
            {category}
          </span>
        ))}
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={setSelectedProduct}
          />
        ))}
      </div>
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </section>
  );
}

export default ProductGrid;
