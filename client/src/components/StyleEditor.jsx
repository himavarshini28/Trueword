import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, Palette, Layout, Type } from 'lucide-react';

const StyleEditor = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [style, setStyle] = useState({
    theme: 'modern',
    primaryColor: '#000000',
    backgroundColor: '#ffffff',
    cardStyle: 'shadow',
    fontFamily: 'inter',
    layout: 'grid'
  });
  const [activeTab, setActiveTab] = useState('theme');

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('testimonialUsers') || '{}');
    const userData = users[userId];
    
    if (!userData) {
      navigate('/');
      return;
    }

    setUser(userData);
    if (userData.style) {
      setStyle(userData.style);
    }
  }, [userId, navigate]);

  const updateStyle = (key, value) => {
    const newStyle = { ...style, [key]: value };
    setStyle(newStyle);
  };

  const saveStyle = () => {
    const users = JSON.parse(localStorage.getItem('testimonialUsers') || '{}');
    users[userId].style = style;
    localStorage.setItem('testimonialUsers', JSON.stringify(users));
    
    // Show success message or redirect
    alert('Style saved successfully!');
  };

  const previewStyle = () => {
    window.open(`/public/${userId}`, '_blank');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading style editor...</p>
        </div>
      </div>
    );
  }

  const themes = [
    { id: 'modern', name: 'Modern', description: 'Clean and minimal design' },
    { id: 'classic', name: 'Classic', description: 'Traditional and elegant' },
    { id: 'vibrant', name: 'Vibrant', description: 'Bold and colorful' },
    { id: 'minimal', name: 'Minimal', description: 'Ultra-clean and simple' }
  ];

  const cardStyles = [
    { id: 'shadow', name: 'Shadow', description: 'Subtle drop shadow' },
    { id: 'border', name: 'Border', description: 'Clean border outline' },
    { id: 'flat', name: 'Flat', description: 'No shadow or border' },
    { id: 'elevated', name: 'Elevated', description: 'Strong shadow depth' }
  ];

  const fontFamilies = [
    { id: 'inter', name: 'Inter', description: 'Modern and readable' },
    { id: 'poppins', name: 'Poppins', description: 'Friendly and geometric' },
    { id: 'playfair', name: 'Playfair Display', description: 'Elegant serif' },
    { id: 'roboto', name: 'Roboto', description: 'Clean and neutral' }
  ];

  const layouts = [
    { id: 'grid', name: 'Grid', description: 'Cards in a grid layout' },
    { id: 'masonry', name: 'Masonry', description: 'Pinterest-style layout' },
    { id: 'list', name: 'List', description: 'Vertical list layout' },
    { id: 'carousel', name: 'Carousel', description: 'Sliding carousel' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate(`/dashboard?userId=${userId}`)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={previewStyle}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button
              onClick={saveStyle}
              className="flex items-center space-x-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Style Controls */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-xl border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900">Style Editor</h1>
                <p className="text-gray-600 mt-1">Customize how your testimonials are displayed</p>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'theme', label: 'Theme', icon: Palette },
                    { id: 'layout', label: 'Layout', icon: Layout },
                    { id: 'typography', label: 'Typography', icon: Type }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Theme Tab */}
                {activeTab === 'theme' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Theme</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {themes.map((theme) => (
                          <button
                            key={theme.id}
                            onClick={() => updateStyle('theme', theme.id)}
                            className={`p-4 border-2 rounded-lg text-left transition-colors ${
                              style.theme === theme.id
                                ? 'border-black bg-gray-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <h4 className="font-semibold text-gray-900">{theme.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{theme.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Colors</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Primary Color
                          </label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              value={style.primaryColor}
                              onChange={(e) => updateStyle('primaryColor', e.target.value)}
                              className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                            />
                            <input
                              type="text"
                              value={style.primaryColor}
                              onChange={(e) => updateStyle('primaryColor', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Background Color
                          </label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              value={style.backgroundColor}
                              onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                              className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
                            />
                            <input
                              type="text"
                              value={style.backgroundColor}
                              onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Style</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {cardStyles.map((cardStyle) => (
                          <button
                            key={cardStyle.id}
                            onClick={() => updateStyle('cardStyle', cardStyle.id)}
                            className={`p-4 border-2 rounded-lg text-left transition-colors ${
                              style.cardStyle === cardStyle.id
                                ? 'border-black bg-gray-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <h4 className="font-semibold text-gray-900">{cardStyle.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{cardStyle.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Layout Tab */}
                {activeTab === 'layout' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Layout Style</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {layouts.map((layout) => (
                          <button
                            key={layout.id}
                            onClick={() => updateStyle('layout', layout.id)}
                            className={`p-4 border-2 rounded-lg text-left transition-colors ${
                              style.layout === layout.id
                                ? 'border-black bg-gray-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <h4 className="font-semibold text-gray-900">{layout.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{layout.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Typography Tab */}
                {activeTab === 'typography' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Font Family</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {fontFamilies.map((font) => (
                          <button
                            key={font.id}
                            onClick={() => updateStyle('fontFamily', font.id)}
                            className={`p-4 border-2 rounded-lg text-left transition-colors ${
                              style.fontFamily === font.id
                                ? 'border-black bg-gray-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <h4 className="font-semibold text-gray-900">{font.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{font.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-xl border border-gray-200 sticky top-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                <p className="text-sm text-gray-600 mt-1">See how your changes look</p>
              </div>
              
              <div className="p-6">
                <div 
                  className="rounded-lg p-4"
                  style={{ backgroundColor: style.backgroundColor }}
                >
                  <div 
                    className={`rounded-lg p-4 ${
                      style.cardStyle === 'shadow' ? 'shadow-md' :
                      style.cardStyle === 'border' ? 'border border-gray-200' :
                      style.cardStyle === 'elevated' ? 'shadow-xl' : ''
                    }`}
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                        style={{ backgroundColor: style.primaryColor }}
                      >
                        JD
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">John Doe</p>
                        <p className="text-sm text-gray-600">CEO, TechCorp</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      "This product has transformed our workflow completely. The team behind it is amazing and the support is top-notch!"
                    </p>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: '#fbbf24' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleEditor;
