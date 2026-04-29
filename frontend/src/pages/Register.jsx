import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ErrorAlert from '../components/common/ErrorAlert';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', passwordConfirm: '', businessName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      businessName: formData.businessName
    });
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-600 mt-2">Get started with your free account</p>
          </div>
          
          <ErrorAlert message={error} />
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="John Doe" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="john@example.com" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name <span className="text-gray-400">(optional)</span></label>
              <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Your Business Name" value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Min 6 characters" value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input type="password" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Confirm your password" value={formData.passwordConfirm}
                onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })} />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <p className="mt-6 text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-500">Sign in</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;