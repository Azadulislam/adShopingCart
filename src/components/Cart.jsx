import { useEffect } from 'react';
import { useCart } from '../context/useCart';
import './Cart.css';

function Cart({ isOpen, onClose }) {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCart();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const isEmpty = cartItems.length === 0;

  // === UX / A11y side-effects when cart drawer opens ===
  // 1. Lock body scroll (overlay UX); 2. Close on Escape key (WCAG)
  useEffect(() => {
    if (!isOpen) return undefined;

    // Body scroll lock: preserve scroll position via top padding
    const { documentElement, body } = document;
    const scrollY = window.scrollY || documentElement.scrollTop;
    const prevOverflow = documentElement.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;

    documentElement.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    // Use position:fixed + top:-scrollY trick to preserve visible scrollbar width
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    // Escape key handler
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (typeof onClose === 'function') onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      // Restore body scroll and position
      documentElement.style.overflow = prevOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;
      // Restore exact scroll Y (position:fixed trick loses it otherwise)
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside
        className={`cart-drawer ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-dialog-title"
        aria-hidden={!isOpen}
      >
        <div className="cart-header">
          <div>
            <h2 id="cart-dialog-title" className="cart-title">Your Cart</h2>
            <p className="cart-subtitle">
              {totalItems === 1 ? '1 item' : `${totalItems} items`}
            </p>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {isEmpty ? (
          <div className="cart-empty">
            <div className="cart-empty-icon" aria-hidden="true">🛒</div>
            <p className="cart-empty-text">Your cart is empty</p>
            <p className="cart-empty-hint">Add some products to get started</p>
          </div>
        ) : (
          <ul className="cart-items">
            {cartItems.map((item) => {
              const unitPrice = Number(item.price) || 0;
              const lineSubtotal = unitPrice * item.quantity;
              return (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-image"
                    loading="lazy"
                  />
                  <div className="cart-item-details">
                    {item.category && (
                      <span className="cart-item-category">
                        {item.category}
                      </span>
                    )}
                    <h4 className="cart-item-name">{item.title}</h4>
                    <p className="cart-item-price-row">
                      <span className="cart-item-unit">
                        ${unitPrice.toFixed(2)} <span className="cart-item-unit-label">each</span>
                      </span>
                      <span className="cart-item-subtotal">
                        ${lineSubtotal.toFixed(2)}
                      </span>
                    </p>
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="cart-footer">
          <div className="cart-summary-block">
            <div className="summary-row">
              <span className="summary-label">Total Items</span>
              <span className="summary-count">{totalItems}</span>
            </div>
            <div className="summary-row summary-row-total">
              <span className="summary-label summary-label-total">Total</span>
              <span className="summary-value">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            type="button"
            className="clear-cart-btn"
            onClick={clearCart}
            disabled={isEmpty}
          >
            Clear Cart
          </button>
        </div>
      </aside>
    </>
  );
}

export default Cart;
