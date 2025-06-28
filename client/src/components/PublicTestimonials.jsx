import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ExternalLink, Heart } from 'lucide-react';

const PublicTestimonials = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('testimonialUsers') || '{}');
    const userData = users[userId];
    
    if (!userData) {
      setLoading(false);
      return;
    }

    setUser(userData);
    setLoading(false);
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Page Not Found</h1>
          <p className="text-gray-600 mb-6">
            The testimonial page you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <span>Create Your Own</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  const style = user.style || {
    theme: 'modern',
    primaryColor: '#000000',
    backgroundColor: '#ffffff',
    cardStyle: 'shadow',
    fontFamily: 'inter',
    layout: 'grid'
  };

  const getCardClasses = () => {
    const baseClasses = 'bg-white rounded-xl p-6 transition-all duration-300 hover:scale-105';
    
    switch (style.cardStyle) {
      case 'shadow':
        return `${baseClasses} shadow-md hover:shadow-lg`;
      case 'border':
        return `${baseClasses} border-2 border-gray-200 hover:border-gray-300`;
      case 'elevated':
        return `${baseClasses} shadow-xl hover:shadow-2xl`;
      case 'flat':
      default:
        return `${baseClasses} hover:bg-gray-50`;
    }
  };

  const getLayoutClasses = () => {
    switch (style.layout) {
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6';
      case 'list':
        return 'max-w-3xl mx-auto space-y-6';
      case 'carousel':
        return 'flex space-x-6 overflow-x-auto pb-4';
      case 'grid':
      default:
        return 'grid gap-6 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const getFontFamily = () => {
    switch (style.fontFamily) {
      case 'poppins':
        return 'font-poppins';
      case 'playfair':
        return 'font-playfair';
      case 'roboto':
        return 'font-roboto';
      case 'inter':
      default:
        return 'font-inter';
    }
  };

  return (
    <div 
      className={`min-h-screen ${getFontFamily()}`}
      style={{ backgroundColor: style.backgroundColor }}
    >
      {/* Header */}
      <header className="px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: style.primaryColor }}
          >
            <Star className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Customer Testimonials
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            See what our amazing customers have to say about their experience
          </p>

          {user.testimonials.length > 0 && (
            <div className="flex justify-center items-center space-x-8 mt-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium">
                  {(user.testimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / user.testimonials.length).toFixed(1)} 
                  average rating
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-400 fill-current" />
                <span className="font-medium">{user.testimonials.length} testimonials</span>
              </div>
            </div>
          )}
        </motion.div>
      </header>

      {/* Testimonials */}
      <main className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {user.testimonials.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">No testimonials yet</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Be the first to share your experience and help others make informed decisions.
              </p>
              <a
                href={`/testimonial/${userId}`}
                className="inline-flex items-center space-x-2 px-8 py-4 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: style.primaryColor }}
              >
                <Star className="w-5 h-5" />
                <span>Leave a Testimonial</span>
              </a>
            </motion.div>
          ) : (
            <div className={getLayoutClasses()}>
              {user.testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id || index}
                  className={getCardClasses()}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={style.layout === 'carousel' ? { minWidth: '300px' } : {}}
                >
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= (testimonial.rating || 5)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Message */}
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.message}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: style.primaryColor }}
                    >
                      {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      {testimonial.jobTitle && (
                        <p className="text-sm text-gray-600">{testimonial.jobTitle}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        {new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* CTA Section */}
      {user.testimonials.length > 0 && (
        <section className="px-6 py-20">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Share Your Experience
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Have you had a great experience? We'd love to hear from you and share your story with others.
            </p>
            <a
              href={`/testimonial/${userId}`}
              className="inline-flex items-center space-x-2 px-8 py-4 text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
              style={{ backgroundColor: style.primaryColor }}
            >
              <Star className="w-5 h-5" />
              <span>Leave a Testimonial</span>
            </a>
          </motion.div>
        </section>
      )}

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">TrueWord</span>
          </div>
          <p className="text-gray-600 mb-4">
            Powered by TrueWord - Build trust with authentic testimonials
          </p>
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Create your own testimonial page
          </a>
        </div>
      </footer>
    </div>
  );
};

export default PublicTestimonials;
