import { useCart } from '../context/useCart';
import './ProductCard.css';

function ProductCard({ product }) {
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
