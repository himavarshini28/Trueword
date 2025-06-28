import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Send, ArrowLeft, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

const TestimonialForm = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('testimonialUsers') || '{}');
    const userData = users[userId];
    
    if (!userData) {
      navigate('/');
      return;
    }

    setUser(userData);
  }, [userId, navigate]);

  const onSubmit = (data) => {
    const testimonial = {
      ...data,
      rating,
      createdAt: new Date().toISOString(),
      id: Date.now()
    };

    const users = JSON.parse(localStorage.getItem('testimonialUsers') || '{}');
    users[userId].testimonials.unshift(testimonial);
    localStorage.setItem('testimonialUsers', JSON.stringify(users));

    setSubmitted(true);
    reset();
    setRating(5);
  };

  const resetForm = () => {
    setSubmitted(false);
    reset();
    setRating(5);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-6">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your testimonial has been submitted successfully. We really appreciate you taking the time to share your experience!
          </p>
          
          <div className="space-y-3">
            <button
              onClick={resetForm}
              className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Submit Another Testimonial
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 transition-colors"
            >
              Create Your Own
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">TrueWord</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Share Your Experience</h1>
            <p className="text-gray-600 text-lg">
              Your feedback helps others make better decisions
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 pb-12">
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            
            {/* Rating */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                How would you rate your experience?
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-4 text-lg font-medium text-gray-700">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </span>
              </div>
            </div>

            {/* Name */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Your Name *
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Email Address *
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
              )}
            </div>

            {/* Job Title (Optional) */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Job Title / Company <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                {...register('jobTitle')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors"
                placeholder="e.g., Marketing Manager at TechCorp"
              />
            </div>

            {/* Testimonial */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Your Testimonial *
              </label>
              <textarea
                {...register('message', { 
                  required: 'Testimonial message is required',
                  minLength: {
                    value: 10,
                    message: 'Please write at least 10 characters'
                  }
                })}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors resize-none"
                placeholder="Share your experience, what you liked, and how it helped you..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-2">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-black text-white rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-5 h-5" />
              <span>Submit Testimonial</span>
            </motion.button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Your testimonial will be reviewed and published shortly
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialForm;
