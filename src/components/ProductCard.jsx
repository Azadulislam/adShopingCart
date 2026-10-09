import { useCart } from '../context/useCart';
import './ProductCard.css';

function ProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart();
  const { title, category, price, image, description } = product;

  const handleClick = () => {
    addToCart(product);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={image}
          alt={title}
          className="product-image"
          loading="lazy"
        />
        {category && (
          <span className="product-category">{category}</span>
        )}
        <button
          type="button"
          className="absolute bottom-3 right-3 rounded-md bg-white/95 px-3 py-2 text-xs font-semibold text-neutral-900 shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          onClick={() => onViewDetails(product)}
          aria-label={`View details for ${title}`}
        >
          Quick view
        </button>
      </div>
      <div className="product-info">
        <p className="product-category-label">{category}</p>
        <h3 className="product-title" title={description}>
          {title}
        </h3>
        <div className="product-footer">
          <span className="product-price">${price.toFixed(2)}</span>
          <button
            type="button"
            className="add-to-cart-btn"
            onClick={handleClick}
            aria-label={`Add ${title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
