import { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar({ cartCount, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile nav on resize to desktop or on route-like anchor nav
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbar-container">
        <a
          href="#top"
          className="navbar-brand"
          onClick={handleLinkClick}
          aria-label="AdCart home"
        >
          <span className="brand-logo" aria-hidden="true">🛒</span>
          <span className="brand-name">AdCart</span>
        </a>

        <div
          className={`navbar-links ${menuOpen ? 'open' : ''}`}
          id="primary-nav"
        >
          <a href="#products" className="nav-link" onClick={handleLinkClick}>
            Products
          </a>
          <a href="#about" className="nav-link" onClick={handleLinkClick}>
            About
          </a>
        </div>

        <div className="navbar-actions">
          <button
            type="button"
            className="cart-button"
            onClick={onCartClick}
            aria-label={`Cart with ${cartCount} items`}
          >
            <span className="cart-icon" aria-hidden="true">🧺</span>
            <span className="cart-label">Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge" aria-live="polite">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
