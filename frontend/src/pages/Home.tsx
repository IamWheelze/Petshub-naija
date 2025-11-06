import { Link } from 'react-router-dom';
import { ShoppingBag, Users, Heart, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to PetHub Nigeria
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              The ultimate platform for pet lovers - Shop, Connect, and Find Your Perfect Pet
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Get Started
              </Link>
              <Link to="/shop" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition">
                Browse Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose PetHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">E-commerce</h3>
              <p className="text-gray-600">Shop for premium pet products with fast delivery across Nigeria</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Social Network</h3>
              <p className="text-gray-600">Connect with pet lovers and share your pet's moments</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Marketplace</h3>
              <p className="text-gray-600">Buy, sell, and adopt pets from verified breeders</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Breeding Services</h3>
              <p className="text-gray-600">Find quality breeding services for your pets</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Community?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of pet lovers across Nigeria
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-3">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
