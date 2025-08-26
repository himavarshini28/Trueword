import { useAuthStore } from "../store/authstore";
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignupPage() {
  const [errors,setErrors]=useState({});
  const navigate=useNavigate();
  const signup = useAuthStore(state => state.signup);
const loading = useAuthStore(state => state.loading);
const error = useAuthStore(state => state.error);

  const validateForm =(formData)=>{
    const errors={};
    if(formData.username.length<2)
    {
      errors.username="username must be at least 2 characters";
    }
     if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/\d/.test(formData.password)) {
      errors.password = "Password must contain at least one number";
    }
    
    // Email validation
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    return errors;
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData=
    { username : e.target.username.value,
     email : e.target.email.value,
     password : e.target.password.value,
     company : e.target.company.value};

    const errors= validateForm(formData);

     if(Object.keys(errors).length>0)
     {
        setErrors(errors);
        return;
     }
         setErrors({});
     const success= await signup( formData.username,
    formData.email,
    formData.password,
    formData.company);

     if(success) navigate("/");
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg border border-white bg-black/80">
        <h2 className="text-3xl text-white mb-8 text-center">Join <span className="text-stroke text-black italic">TrueWord</span></h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white mb-2" htmlFor="username">Username</label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              className="bg-transparent border border-white text-white placeholder-gray-400"
              autoComplete="username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          
          <div>
            <label className="block text-white mb-2" htmlFor="email">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border border-white text-white placeholder-gray-400"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-white mb-2" htmlFor="password">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              className="bg-transparent border border-white text-white placeholder-gray-400"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          
          <div>
            <label className="block text-white mb-2" htmlFor="company">Company (Optional)</label>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Your company name"
              className="bg-transparent border border-white text-white placeholder-gray-400"
              autoComplete="organization"
            />
          </div>
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full !bg-transparent !border !border-white !text-white hover:!bg-white hover:!text-black transition font-semibold py-2"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
          
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <div className="mt-6 text-center">
          <a href="/login" className="text-white underline hover:text-gray-300 transition">Already have an account? Log In</a>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;