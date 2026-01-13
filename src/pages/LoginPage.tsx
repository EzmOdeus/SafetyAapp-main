import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/logo.png';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

interface LoginPageProps {
  onLogin: () => void;
  onRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();
  const { login } = useKindeAuth();

  // دالة تسجيل الدخول مع Google
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await login({
        connectionId: "conn_6a95dec504d34dc286dc80e8df9f6099",
      });
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // دالة تسجيل الدخول العادي
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await onLogin();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // دالة التسجيل
  const handleRegister = async () => {
    setIsLoading(true);
    try {
      await onRegister();
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "bg-gray-900"
          : "bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700"
      } flex items-center justify-center p-4`}
    >
      <div
        className={`w-full max-w-md ${
          isDark ? "bg-gray-800" : "bg-white"
        } rounded-2xl shadow-xl p-8`}
      >
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="SafetyApp Logo"
            className="w-24 h-24 mx-auto mb-4 object-contain"
          />
          <h1
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            SafetyApp
          </h1>
          <p
            className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            } mt-2`}
          >
            Your safety is our priority
          </p>
        </div>

        <div className="space-y-4">
          {/* زر تسجيل الدخول العادي */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 hover:scale-105 active:scale-98"
            } text-white shadow-lg hover:shadow-xl`}
          >
            {isLoading ? "Signing In..." : "Sign In with Email"}
          </button>

          {/* زر إنشاء حساب جديد */}
          <button
            onClick={handleRegister}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-98"
            } text-white shadow-lg hover:shadow-xl`}
          >
            {isLoading ? "Creating Account..." : "Create New Account"}
          </button>

          {/* خط فاصل */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${isDark ? 'border-gray-700' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                Or continue with
              </span>
            </div>
          </div>

          {/* زر تسجيل الدخول مع Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-50 hover:shadow-md active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Google Icon */}
            <svg className="h-5 w-5" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.7 1.22 9.18 3.22l6.86-6.86C35.9 2.34 30.4 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.3 13.16 17.7 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.6-.14-3.14-.4-4.64H24v9.02h12.94c-.56 2.98-2.24 5.5-4.76 7.2l7.73 6c4.52-4.18 7.07-10.34 7.07-17.58z"
              />
              <path
                fill="#FBBC05"
                d="M10.54 28.42c-.48-1.44-.76-2.98-.76-4.42s.28-2.98.76-4.42l-7.98-6.2C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.62l7.98-6.2z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.4 0 11.9-2.12 15.86-5.78l-7.73-6c-2.14 1.44-4.88 2.3-8.13 2.3-6.3 0-11.7-3.66-13.46-8.92l-7.98 6.2C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* معلومات إضافية */}
        <div className={`mt-6 text-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
