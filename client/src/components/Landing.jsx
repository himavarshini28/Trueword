import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Sparkles, ArrowRight, Copy, Check } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const Landing = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState(null);

  const generateLink = () => {
    const newUserId = uuidv4();
    setUserId(newUserId);
    
    // Store user in localStorage for demo purposes
    const users = JSON.parse(localStorage.getItem('testimonialUsers') || '{}');
    users[newUserId] = {
      id: newUserId,
      createdAt: new Date().toISOString(),
      testimonials: [],
      style: {
        theme: 'modern',
        primaryColor: '#000000',
        backgroundColor: '#ffffff',
        cardStyle: 'shadow'
      }
    };
    localStorage.setItem('testimonialUsers', JSON.stringify(users));
  };

  const copyLink = () => {
    const link = `${window.location.origin}/testimonial/${userId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const goToDashboard = () => {
    if (userId) {
      navigate(`/dashboard?userId=${userId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="px-6 py-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TrueWord</span>
          </motion.div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <motion.button
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full">
                <Sparkles className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Collect Beautiful Testimonials</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get testimonials from your customers with 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600"> ease</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Create a unique link, collect testimonials, and showcase them beautifully with our stunning customizable displays.
            </p>

            {!userId ? (
              <motion.button
                onClick={generateLink}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-black text-white rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Create Your Link</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            ) : (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 max-w-2xl mx-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Testimonial Collection Link</h3>
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                    <code className="flex-1 text-sm text-gray-700 font-mono">
                      {window.location.origin}/testimonial/{userId}
                    </code>
                    <button
                      onClick={copyLink}
                      className="flex items-center space-x-1 px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={copyLink}
                    className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={goToDashboard}
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to collect testimonials
            </h2>
            <p className="text-gray-600 text-lg">
              Simple, powerful, and beautifully designed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Easy Collection",
                description: "Share your unique link and start collecting testimonials instantly."
              },
              {
                icon: Sparkles,
                title: "Beautiful Styling",
                description: "Customize the look and feel with our intuitive style editor."
              },
              {
                icon: Star,
                title: "Showcase Anywhere",
                description: "Display your testimonials on your website or social media."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <feature.icon className="w-12 h-12 text-gray-900 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">TrueWord</span>
          </div>
          <p className="text-gray-600">
            Build trust with authentic testimonials
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
