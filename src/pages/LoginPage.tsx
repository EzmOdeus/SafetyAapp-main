import React, { useState } from 'react';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/logo.png'; 
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('demo@safety.com');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // const { login } = useKindeAuth();
  const { isDark } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

const { login, register } = useKindeAuth();
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700'} flex items-center justify-center p-4`}>
      <div className={`w-full max-w-md ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
        <div className="text-center mb-8">

          <img
            src={logo}
            alt="SafetyApp Logo"
            className="w-24 h-24 mx-auto mb-4 object-contain"
          />
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            SafetyApp
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
            Your safety is our priority
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg border ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                  : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
              } focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors`}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-4 py-3 rounded-lg border ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-colors pr-12`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                } transition-colors`}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 hover:scale-105 active:scale-98'
            } text-white shadow-lg hover:shadow-xl`}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
          <button
           onClick={()=>register()}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600  from-via-purple-600 to-green-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 hover:scale-105 active:scale-98'
            } text-white shadow-lg hover:shadow-xl`}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

    
      </div>
    </div>
    
  );
};

export default LoginPage;