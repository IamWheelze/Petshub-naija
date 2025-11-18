import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { useWishlistStore } from '../../stores/wishlistStore';
import { useCartStore } from '../../stores/cartStore';

const Wishlist = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore(state => state.addItem);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  const handleMoveToCart = (item: typeof items[0]) => {
    addToCart({
      id: `${item.id}-${Date.now()}`,
      productId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      inStock: item.inStock,
    });
    removeItem(item.id);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <Heart className="mx-auto h-24 w-24 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">
            Save items you love to your wishlist!
          </p>
          <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <button
          onClick={clearWishlist}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/shop/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover hover:scale-105 transition-transform"
              />
            </Link>
            <div className="p-4">
              <Link to={`/shop/${item.id}`}>
                <h3 className="font-semibold text-lg mb-2 hover:text-primary-600 line-clamp-2">
                  {item.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-500 mb-2">{item.category}</p>
              <p className="text-xl font-bold text-primary-600 mb-3">
                {formatPrice(item.price)}
              </p>
              {!item.inStock && (
                <p className="text-red-600 text-sm font-medium mb-2">Out of Stock</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleMoveToCart(item)}
                  disabled={!item.inStock}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm py-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
