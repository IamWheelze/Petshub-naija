import { Link } from 'react-router-dom';
import { MapPin, Calendar, Heart } from 'lucide-react';

interface PetCardProps {
  id: string;
  title: string;
  breed: string;
  age: string;
  gender: string;
  price: number;
  image: string;
  location: string;
  seller: {
    name: string;
    verified: boolean;
  };
  vaccinated?: boolean;
  featured?: boolean;
}

const PetCard: React.FC<PetCardProps> = ({
  id,
  title,
  breed,
  age,
  gender,
  price,
  image,
  location,
  seller,
  vaccinated = false,
  featured = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {featured && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-1 text-sm font-semibold">
          ⭐ Featured Listing
        </div>
      )}

      <Link to={`/marketplace/${id}`} className="block relative">
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <Heart size={20} className="text-gray-600" />
          </button>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/marketplace/${id}`}>
          <h3 className="font-bold text-lg text-gray-800 mb-1 hover:text-primary-600 line-clamp-1">
            {title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-2">{breed}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            {gender === 'MALE' ? '♂ Male' : '♀ Female'}
          </span>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1">
            <Calendar size={12} />
            {age}
          </span>
          {vaccinated && (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
              ✓ Vaccinated
            </span>
          )}
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
        </div>

        <div className="border-t pt-3 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">₦{price.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Seller</p>
            <p className="text-sm font-semibold text-gray-700">
              {seller.name}
              {seller.verified && (
                <span className="text-blue-500 ml-1" title="Verified Breeder">
                  ✓
                </span>
              )}
            </p>
          </div>
        </div>

        <Link
          to={`/marketplace/${id}`}
          className="mt-3 block w-full bg-primary-600 text-white text-center py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
