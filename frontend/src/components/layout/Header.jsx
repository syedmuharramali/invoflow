import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { APP_NAME } from '../../utils/constants';
import { FiMenu, FiX, FiLogOut, FiUser, FiFileText } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-indigo-600">{APP_NAME}</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 transition">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 transition">Dashboard</Link>
                <Link to="/invoices" className="text-gray-600 hover:text-indigo-600 transition">Invoices</Link>
                <div className="flex items-center space-x-4 ml-4">
                  <span className="text-sm text-gray-500">{user.name}</span>
                  <button onClick={handleLogout} className="btn-primary text-sm !py-2 !px-4">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition">Login</Link>
                <Link to="/register" className="btn-primary text-sm !py-2 !px-4">
                  Get Started
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="flex flex-col space-y-3 pt-4">
              <Link to="/" className="text-gray-600 hover:text-indigo-600 py-2" onClick={() => setIsOpen(false)}>Home</Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 py-2" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  <Link to="/invoices" className="text-gray-600 hover:text-indigo-600 py-2" onClick={() => setIsOpen(false)}>Invoices</Link>
                  <button onClick={handleLogout} className="text-red-600 hover:text-red-800 py-2 text-left">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-indigo-600 py-2" onClick={() => setIsOpen(false)}>Login</Link>
                  <Link to="/register" className="btn-primary text-center" onClick={() => setIsOpen(false)}>Get Started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;