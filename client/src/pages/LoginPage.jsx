import { useAuthStore } from "../store/authstore";

function LoginPage()
{
    const {login,loading,error} = useAuthStore();

    const handleSubmit = (e)=>
    {
        const email = e.target.email.value;
        const password = e.target.password.value;
        login(email,password);
    };

    return (
        <form onSubmit={handleSubmit}>
             <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit" disabled={loading}>Login</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
}

export default LoginPage;