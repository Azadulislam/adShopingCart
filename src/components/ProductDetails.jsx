import { useEffect } from 'react';

function ProductDetails({ product, onClose, onAddToCart }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/65 p-3 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-details-title"
        className="relative grid max-h-[92vh] w-full max-w-4xl grid-cols-1 overflow-y-auto rounded-lg bg-white shadow-2xl md:grid-cols-2"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white text-xl text-neutral-700 shadow transition hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          aria-label="Close product details"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="min-h-64 bg-neutral-100 md:min-h-[32rem]">
          <img
            src={product.image}
            alt={product.title}
            className="h-full min-h-64 w-full object-cover md:min-h-[32rem]"
          />
        </div>
        <div className="flex flex-col p-6 sm:p-9">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
            {product.category}
          </p>
          <h2
            id="product-details-title"
            className="max-w-sm text-2xl font-semibold leading-tight text-neutral-950 sm:text-3xl"
          >
            {product.title}
          </h2>
          <p className="mt-5 text-2xl font-semibold text-neutral-950">
            ${product.price.toFixed(2)}
          </p>
          <div className="my-6 h-px w-full bg-neutral-200" />
          <p className="text-sm leading-7 text-neutral-600">
            {product.description}
          </p>
          <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              className="min-h-12 flex-1 rounded-md bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-h-12 rounded-md border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
            >
              Continue shopping
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;