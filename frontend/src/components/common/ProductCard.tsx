import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  category?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  comparePrice,
  image,
  rating = 4.5,
  reviews = 0,
  inStock = true,
  category = 'General',
}) => {
  const discount = comparePrice ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
  const addToCart = useCartStore(state => state.addItem);
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inStock) return;

    addToCart({
      id: `${id}-${Date.now()}`,
      productId: id,
      name,
      price,
      image,
      inStock,
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist({
      id,
      name,
      price,
      image,
      category,
      inStock,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <Link to={`/shop/${id}`} className="block relative">
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
              -{discount}%
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/shop/${id}`}>
          <h3 className="font-semibold text-gray-800 mb-2 hover:text-primary-600 line-clamp-2">
            {name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>{i < Math.floor(rating) ? '★' : '☆'}</span>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-primary-600">₦{price.toLocaleString()}</span>
            {comparePrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ₦{comparePrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!inStock}
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
          <button
            onClick={handleAddToWishlist}
            className={`p-2 rounded-lg transition-colors ${
              isInWishlist(id)
                ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart size={20} className={isInWishlist(id) ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
