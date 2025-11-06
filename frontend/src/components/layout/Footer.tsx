import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🐾 PetHub Nigeria</h3>
            <p className="text-gray-400">
              Your one-stop platform for pet social networking, shopping, and marketplace.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/shop?category=food" className="hover:text-white">Pet Food</Link></li>
              <li><Link to="/shop?category=toys" className="hover:text-white">Toys</Link></li>
              <li><Link to="/shop?category=accessories" className="hover:text-white">Accessories</Link></li>
              <li><Link to="/shop?category=health" className="hover:text-white">Health & Care</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PetHub Nigeria. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
