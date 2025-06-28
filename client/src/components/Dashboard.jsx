import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Settings, Eye, Copy, Check, Plus, ExternalLink } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }

    const users = JSON.parse(localStorage.getItem('testimonialUsers') || '{}');
    const userData = users[userId];
    
    if (!userData) {
      navigate('/');
      return;
    }

    setUser(userData);
  }, [userId, navigate]);

  const copyLink = (type) => {
    const baseUrl = window.location.origin;
    const link = type === 'collect' 
      ? `${baseUrl}/testimonial/${userId}`
      : `${baseUrl}/public/${userId}`;
    
    navigator.clipboard.writeText(link);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const deleteTestimonial = (index) => {
    const users = JSON.parse(localStorage.getItem('testimonialUsers') || '{}');
    users[userId].testimonials.splice(index, 1);
    localStorage.setItem('testimonialUsers', JSON.stringify(users));
    setUser(users[userId]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TrueWord</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/style/${userId}`)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Style Editor</span>
            </button>
            <button
              onClick={() => window.open(`/public/${userId}`, '_blank')}
              className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your testimonials and customize their display</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-white p-6 rounded-xl border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Testimonials</p>
                <p className="text-2xl font-bold text-gray-900">{user.testimonials.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-xl border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {user.testimonials.length > 0 
                    ? (user.testimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / user.testimonials.length).toFixed(1)
                    : '0.0'
                  }
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-xl border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div 
          className="bg-white p-6 rounded-xl border border-gray-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="text-sm text-gray-600 font-medium">Collection Link</p>
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                <code className="flex-1 text-sm text-gray-700 font-mono truncate">
                  {window.location.origin}/testimonial/{userId}
                </code>
                <button
                  onClick={() => copyLink('collect')}
                  className="flex items-center space-x-1 px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800 transition-colors"
                >
                  {copied === 'collect' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied === 'collect' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-600 font-medium">Public Display Link</p>
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                <code className="flex-1 text-sm text-gray-700 font-mono truncate">
                  {window.location.origin}/public/{userId}
                </code>
                <button
                  onClick={() => copyLink('public')}
                  className="flex items-center space-x-1 px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800 transition-colors"
                >
                  {copied === 'public' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied === 'public' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          className="bg-white rounded-xl border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Testimonials</h2>
              <button
                onClick={() => window.open(`/public/${userId}`, '_blank')}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Public Page</span>
              </button>
            </div>
          </div>

          {user.testimonials.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
              <p className="text-gray-600 mb-6">Share your collection link to start receiving testimonials</p>
              <button
                onClick={() => copyLink('collect')}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Copy Collection Link
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {user.testimonials.map((testimonial, index) => (
                <div key={index} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= (testimonial.rating || 5)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => deleteTestimonial(index)}
                        className="text-sm text-red-600 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{testimonial.message}</p>
                  <p className="text-xs text-gray-500 mt-3">
                    {new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
