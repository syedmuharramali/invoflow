import { Link } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE } from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-indigo-400 mb-4">{APP_NAME}</h3>
            <p className="text-gray-400">{APP_TAGLINE}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Invoice Management</li>
              <li>PDF Generation</li>
              <li>Client Tracking</li>
              <li>Tax Calculations</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">Ready to streamline your invoicing? Get started today.</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;