import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext"; // Import the AuthContext
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { isAuthenticated, handleLogin, handleLogout,redirectPath } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Auto-clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const { token, username } = response.data;  // Destructuring token and username from the response
      handleLogin(token, username);  // Pass them as separate arguments
      navigate(redirectPath||'/');
      // alert(redirectPath);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err.message);
    }
  };
  

  return (
    <>
      {isAuthenticated ? (
        <div>
          <p>Welcome, you're logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img alt="Your Company" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" className="mx-auto h-10 w-auto" />
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Log in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm form-login">
            <form onSubmit={handleLoginSubmit} className="space-y-6 form-input">
              <div>
                <label htmlFor="email" className="block text-lg font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2 form-input">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    autoComplete="email"
                    className="inp block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-lg font-medium leading-6 text-gray-900">Password</label>
                  <div className="text-lg">
                    <Link to="../forgotpassword" className="inp font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="inp block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Sign in
                </button>
                {error && <p style={{ color: 'red', paddingTop: "10px" }}>{error}</p>}
              </div>
            </form>

            <p className="mt-6 text-center text-lg text-gray-500">
              Not a member?{" "}
              <Link to="../register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
