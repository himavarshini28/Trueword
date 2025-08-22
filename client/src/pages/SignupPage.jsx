import { useAuthStore } from "../store/authstore";

function SignupPage() {
  const { signup, loading, error } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const company = e.target.company.value;
    signup(username, email, password, company);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" type="text" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <input name="company" type="text" placeholder="Company (optional)" />
      <button type="submit" disabled={loading}>Sign Up</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}

export default SignupPage;