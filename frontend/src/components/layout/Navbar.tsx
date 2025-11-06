import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingCart, User, Heart, Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">🐾 PetHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-gray-700 hover:text-primary-600 transition">
              Shop
            </Link>
            <Link to="/marketplace" className="text-gray-700 hover:text-primary-600 transition">
              Marketplace
            </Link>
            {isAuthenticated && (
              <Link to="/feed" className="text-gray-700 hover:text-primary-600 transition">
                Feed
              </Link>
            )}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="text-gray-700 hover:text-primary-600">
                  <ShoppingCart size={24} />
                </Link>
                <Link to="/wishlist" className="text-gray-700 hover:text-primary-600">
                  <Heart size={24} />
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                    ) : (
                      <User size={24} className="text-gray-700" />
                    )}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <Link
                      to={`/profile/${user?.id}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link
              to="/shop"
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/marketplace"
              className="block py-2 text-gray-700 hover:text-primary-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Marketplace
            </Link>
            {isAuthenticated && (
              <Link
                to="/feed"
                className="block py-2 text-gray-700 hover:text-primary-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Feed
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
