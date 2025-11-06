import { Link } from 'react-router-dom';
import { ShoppingBag, Users, Heart, TrendingUp, Star, ArrowRight } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import PetCard from '../components/common/PetCard';
import { mockProducts, mockPets, mockTestimonials, mockCategories } from '../data/mockData';

const Home = () => {
  const featuredProducts = mockProducts.slice(0, 4);
  const featuredPets = mockPets.filter(pet => pet.featured).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-500 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-semibold">🐾 #1 Pet Platform in Nigeria</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Everything Your Pet Needs, All in One Place
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Shop premium pet products, connect with pet lovers, and find your perfect furry companion in Nigeria's largest pet community.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg inline-flex items-center gap-2"
                >
                  Get Started Free
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/shop"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition inline-flex items-center gap-2"
                >
                  Browse Shop
                  <ShoppingBag size={20} />
                </Link>
              </div>

              <div className="flex items-center gap-8 mt-12">
                <div>
                  <p className="text-3xl font-bold">10K+</p>
                  <p className="text-white/80">Pet Lovers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-white/80">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">1K+</p>
                  <p className="text-white/80">Pets Listed</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500"
                  alt="Happy dog"
                  className="rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300"
                />
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500"
                  alt="Cute cat"
                  className="rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300 mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {mockCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/shop?category=${category.slug}`}
                className="bg-white p-4 rounded-lg text-center hover:shadow-md transition group"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition">{category.icon}</div>
                <p className="font-medium text-sm text-gray-800">{category.name}</p>
                <p className="text-xs text-gray-500">{category.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Top-rated products loved by pet owners</p>
            </div>
            <Link to="/shop" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2">
              View All
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Pet Lovers Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-primary-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Products</h3>
              <p className="text-gray-600">Shop from 500+ quality pet products with fast delivery across Nigeria</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pet Community</h3>
              <p className="text-gray-600">Connect with 10K+ pet lovers and share your pet's journey</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-primary-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Breeders</h3>
              <p className="text-gray-600">Buy from trusted, verified breeders with health guarantees</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-primary-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery in Lagos and Abuja. Nationwide shipping available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Find Your Perfect Companion</h2>
              <p className="text-gray-600">Featured pets from verified breeders</p>
            </div>
            <Link to="/marketplace" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2">
              View All Pets
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPets.map((pet) => (
              <PetCard key={pet.id} {...pet} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Pet Owners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join Nigeria's #1 Pet Community?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join 10,000+ pet lovers who trust PetHub for all their pet needs
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg text-lg"
          >
            Create Free Account →
          </Link>
          <p className="text-sm mt-4 text-white/80">No credit card required • Free forever</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary-600 mb-2">500+</p>
              <p className="text-gray-600">Products Available</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-600 mb-2">10K+</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-600 mb-2">98%</p>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary-600 mb-2">24/7</p>
              <p className="text-gray-600">Customer Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
