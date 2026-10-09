import {
  createContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((product) => {
    if (!product || product.id == null) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        let mutated = false;
        const next = prev.map((item) => {
          if (item.id !== product.id) return item;
          mutated = true;
          return { ...item, quantity: item.quantity + 1 };
        });
        // Should never be !mutated since existing found; guard anyway
        return mutated ? next : prev;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => {
      // Return the SAME reference if no item matched — skips wasteful rerender
      const exists = prev.some((item) => item.id === productId);
      if (!exists) return prev;
      return prev.filter((item) => item.id !== productId);
    });
  }, []);

  const increaseQuantity = useCallback((productId) => {
    setCartItems((prev) => {
      let mutated = false;
      const next = prev.map((item) => {
        if (item.id !== productId) return item;
        mutated = true;
        return { ...item, quantity: item.quantity + 1 };
      });
      // Return original reference if no item matched the id (no-op call)
      return mutated ? next : prev;
    });
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    setCartItems((prev) => {
      let mutated = false;
      const next = prev.map((item) => {
        if (item.id !== productId) return item;
        // Enforce minimum quantity of 1; if already 1, no mutation
        if (item.quantity <= 1) return item;
        mutated = true;
        return { ...item, quantity: item.quantity - 1 };
      });
      // No item changed (none matched, or matched but qty was 1) → reuse prev ref
      return mutated ? next : prev;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems((prev) => (prev.length === 0 ? prev : []));
  }, []);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
      0
    );
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export default CartContext;
