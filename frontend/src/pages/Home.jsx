import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION } from '../utils/constants';
import { FiFileText, FiDownload, FiDollarSign, FiShield, FiCoffee, FiZap } from 'react-icons/fi';

const Home = () => {
  const { user } = useAuth();

  const features = [
    { icon: <FiFileText className="text-3xl text-indigo-600" />, title: 'Create Invoices', desc: 'Create professional invoices in seconds with our intuitive interface.' },
    { icon: <FiDownload className="text-3xl text-indigo-600" />, title: 'PDF Download', desc: 'Download invoices as professional PDF documents instantly.' },
    { icon: <FiDollarSign className="text-3xl text-indigo-600" />, title: 'Auto Calculations', desc: 'Subtotal, tax, and totals calculated automatically.' },
    { icon: <FiShield className="text-3xl text-indigo-600" />, title: 'Secure', desc: 'Your data is protected with JWT authentication.' },
    { icon: <FiZap className="text-3xl text-indigo-600" />, title: 'Fast & Efficient', desc: 'Manage all your invoices from one dashboard.' },
    { icon: <FiCoffee className="text-3xl text-indigo-600" />, title: 'Easy to Use', desc: 'Simple interface designed for business owners.' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
          <div className="container-custom mx-auto px-4 py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  {APP_TAGLINE}
                </h1>
                <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                  {APP_DESCRIPTION}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {user ? (
                    <Link to="/dashboard" className="btn-primary !bg-white !text-indigo-600 !px-8 !py-4 text-lg">
                      Go to Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link to="/register" className="btn-primary !bg-white !text-indigo-600 !px-8 !py-4 text-lg">
                        Get Started Free
                      </Link>
                      <Link to="/login" className="btn-secondary !border-white !text-white !px-8 !py-4 text-lg">
                        Sign In
                      </Link>
                    </>
                  )}
                </div>
                <p className="mt-4 text-indigo-200 text-sm">No credit card required • Free forever</p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <div className="space-y-4">
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-sm opacity-70">Invoice #INV-202405-001</p>
                      <p className="text-2xl font-bold">$9,450.00</p>
                      <p className="text-xs opacity-70 mt-2">Bilal Enterprises</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-sm opacity-70">Invoice #INV-202405-002</p>
                      <p className="text-2xl font-bold">$15,750.00</p>
                      <p className="text-xs opacity-70 mt-2">Tech Solutions Inc.</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-sm opacity-70">Invoice #INV-202405-003</p>
                      <p className="text-2xl font-bold">$3,200.00</p>
                      <p className="text-xs opacity-70 mt-2">WebCraft Studio</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-white">
          <div className="container-custom mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features to manage your invoices efficiently and professionally.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Get started in three simple steps</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Create Account</h3>
                <p className="text-gray-600">Sign up in seconds with just your name and email.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Create Invoice</h3>
                <p className="text-gray-600">Fill in client details and line items. Calculations are automatic.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Download PDF</h3>
                <p className="text-gray-600">Download professional PDF invoices with one click.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-indigo-600 text-white py-16">
          <div className="container-custom mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Streamline Your Invoicing?</h2>
            <p className="text-xl text-indigo-200 mb-8">Join thousands of freelancers and small businesses using {APP_NAME}.</p>
            {!user && (
              <Link to="/register" className="btn-primary !bg-white !text-indigo-600 !px-10 !py-4 text-lg">
                Get Started Free
              </Link>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;