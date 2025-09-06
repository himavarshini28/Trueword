import { useAuthStore } from '../store/authstore';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const token = useAuthStore(state => state.token);
  const navigate = useNavigate();
  
  const handleGetStarted = (e) => {
    e.preventDefault();
    if (token) {
      navigate('/create');
    } else {
      navigate('/signup');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <Navbar />
      <main className="pt-40 flex flex-col items-center justify-center animate-fade-in">
        <h1 className="text-6xl font-extrabold text-white mb-6 text-center tracking-tight drop-shadow-lg animate-slide-down">
          Collect <span className="text-stroke text-black font-poppins">Testimonials </span>Effortlessly
        </h1>
        <p className="text-xl text-gray-300 mb-10 text-center max-w-2xl animate-fade-in">
          TrueWord helps you gather, manage, and showcase authentic testimonials for <span className="font-bold text-white">products, services, professionals, and more</span>.<br />
          Boost trust and credibility with ease.
        </p>
        
        <button 
          onClick={handleGetStarted}
          className="px-10 py-4 bg-white text-black rounded-xl font-semibold shadow-lg hover:bg-gray-200 transition-all duration-300 scale-100 hover:scale-105"
        >
          {token ? 'Create Collection Link' : 'Get Started'}
        </button>
        
        <div className="mt-16 flex flex-wrap gap-8 justify-center animate-fade-in">
          <div className="bg-black rounded-xl shadow-lg p-8 w-72 text-center border border-white hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-bold text-white mb-2">Easy Collection</h3>
            <p className="text-gray-400">Send a link, get a testimonial. No hassle, no friction.</p>
          </div>
          <div className="bg-black rounded-xl shadow-lg p-8 w-72 text-center border border-white hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-bold text-white mb-2">Beautiful Display</h3>
            <p className="text-gray-400">Showcase testimonials with stunning widgets and layouts.</p>
          </div>
          <div className="bg-black rounded-xl shadow-lg p-8 w-72 text-center border border-white hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-bold text-white mb-2">Analytics</h3>
            <p className="text-gray-400">Track engagement and see which testimonials convert best.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;