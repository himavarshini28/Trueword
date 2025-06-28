import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import TestimonialForm from './components/TestimonialForm';
import StyleEditor from './components/StyleEditor';
import PublicTestimonials from './components/PublicTestimonials';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/testimonial/:userId" element={<TestimonialForm />} />
          <Route path="/style/:userId" element={<StyleEditor />} />
          <Route path="/public/:userId" element={<PublicTestimonials />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
