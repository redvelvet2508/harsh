import { signInWithEmailAndPassword } from 'firebase/auth'; // Import specific authentication function
import { getAuth } from 'firebase/auth'; // Import getAuth function to get the Auth instance
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Import CSS file for styling

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth(); // Get the Auth instance
    try {
      // Sign in user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Access the user from the userCredential object
      const user = userCredential.user;
      // Call the onLogin function passed as props with the user object
      onLogin(user);
      // Show success toast message
      toast.success('Login successful');
    } catch (error) {
      // Handle authentication errors
      console.error('Error signing in:', error.message);
      // Show error toast message
      toast.error('Incorrect email or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
