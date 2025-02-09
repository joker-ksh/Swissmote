import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // console.log('Login attempt:', { email, password });
    
    try{
      await axios.post("https://swissmote-ydck.onrender.com/api/auth/login",{
        email: email,
        password: password
      },{withCredentials: true}).then((res) => {
        console.log(res);
      });
      navigate(`/dashboard?email=${email}`);
    }catch(e){
      console.error(e);
      setError(e.response ? e.response.data.message : 'Something went wrong');
    }
  };

  const handleGuestLogin = () => {
    console.log('Guest login attempt');
    // Implement guest login API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-white">Welcome Back</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleGuestLogin}
            className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md transition duration-200"
          >
            Guest Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
