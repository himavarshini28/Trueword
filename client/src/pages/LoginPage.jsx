import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authstore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {login,loading,error} = useAuthStore();
    const navigate=useNavigate();
    const handleSubmit =async(e)=>
    {
        e.preventDefault();
        const email=e.target.email.value;
        const password = e.target.password.value;
       const success= await login(email,password);
       if(success) navigate('/');
    }
    return<>
  <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center">
    <Card className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg border border-white bg-black/80">
      <h2 className="text-3xl text-white mb-8 text-center">Login to <span className="text-stroke text-black italic">TrueWord</span></h2>
      <form className="flex flex-col gap-6"  onSubmit={handleSubmit}>
        <div>
          <label className="block text-white mb-2" htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            className="bg-transparent border border-white text-white placeholder-gray-400"
            autoComplete="email"
          />
        </div>
        <div>
          <label className="block text-white mb-2" htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            className="bg-transparent border border-white text-white placeholder-gray-400"
            autoComplete="current-password"
          />
        </div>
        <Button
          type="submit"
         
          disabled={loading}
          className="w-full !bg-transparent !border !border-white !text-white hover:!bg-white hover:!text-black transition font-semibold py-2"
        >
          Login
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <div className="mt-6 text-center">
        <a href="/signup" className="text-white underline hover:text-gray-300 transition">Don't have an account? Sign Up</a>
      </div>
    </Card>
  </div>
  </>
};

export default Login;