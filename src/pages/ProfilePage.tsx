import React, { useState, useEffect } from 'react';
import { User, Edit, Camera, Phone, Mail, MapPin, Shield, LogOut, Upload, Palette, Save, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const ProfilePage: React.FC = () => {
  const { user, logout } = useKindeAuth();
  const { isDark } = useTheme();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  
  // استخدام بيانات المستخدم من Kinde
  const [localUserData, setLocalUserData] = useState({
    name: user?.given_name ? `${user.given_name} ${user.family_name || ''}`.trim() : 'User',
    email: user?.email || '',
    phone: user?.phone_number || '',
    bio: '',
    location: ''
  });
  
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedThemeColor, setSelectedThemeColor] = useState('purple');

  // تحميل البيانات المحلية المخزنة
  useEffect(() => {
    const savedData = localStorage.getItem('user_profile_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setLocalUserData(prev => ({
          ...prev,
          bio: parsedData.bio || '',
          location: parsedData.location || ''
        }));
        setSelectedAvatar(parsedData.profileImage || '');
        setSelectedThemeColor(parsedData.themeColor || 'purple');
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // حفظ البيانات المحلية
  const handleSave = () => {
    // حفظ في localStorage
    localStorage.setItem('user_profile_data', JSON.stringify({
      ...localUserData,
      profileImage: selectedAvatar,
      themeColor: selectedThemeColor
    }));
    
    setIsEditing(false);
    setShowImageUpload(false);
  };

  const handleCancel = () => {
    // استعادة البيانات الأصلية
    const savedData = localStorage.getItem('user_profile_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setLocalUserData(prev => ({
          ...prev,
          bio: parsedData.bio || '',
          location: parsedData.location || ''
        }));
        setSelectedAvatar(parsedData.profileImage || '');
        setSelectedThemeColor(parsedData.themeColor || 'purple');
      } catch (error) {
        console.error('Error restoring data:', error);
      }
    } else {
      // إذا لم توجد بيانات محفوظة، استخدم بيانات Kinde
      setLocalUserData({
        name: user?.given_name ? `${user.given_name} ${user.family_name || ''}`.trim() : 'User',
        email: user?.email || '',
        phone: user?.phone_number || '',
        bio: '',
        location: ''
      });
      setSelectedAvatar('');
      setSelectedThemeColor('purple');
    }
    
    setIsEditing(false);
    setShowImageUpload(false);
  };

  const avatarOptions = [
    '🔥', '🤖', '𓅅', '༒', '☤', '☸', '☾', '⚚',
    '❤', '☬'
  ];

  const themeColors = [
    { name: 'Purple', value: 'purple', gradient: 'from-purple-500 to-pink-500' },
    { name: 'Blue', value: 'blue', gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Green', value: 'green', gradient: 'from-green-500 to-emerald-500' },
    { name: 'Orange', value: 'orange', gradient: 'from-orange-500 to-red-500' },
    { name: 'Indigo', value: 'indigo', gradient: 'from-indigo-500 to-purple-500' },
    { name: 'Pink', value: 'pink', gradient: 'from-pink-500 to-rose-500' }
  ];

  const getThemeGradient = (color: string) => {
    const theme = themeColors.find(t => t.value === color);
    return theme ? theme.gradient : 'from-purple-500 to-pink-500';
  };

  const getUserDisplayName = () => {
    if (user?.given_name && user?.family_name) {
      return `${user.given_name} ${user.family_name}`;
    } else if (user?.given_name) {
      return user.given_name;
    } else if (user?.name) {
      return user.name;
    } else if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const getInitials = () => {
    const name = getUserDisplayName();
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const profileStats = [
    { label: 'Emergency Contacts', value: '0', icon: Phone },
    { label: 'Safety Features', value: '4', icon: Shield },
    { label: 'Account Type', value: 'Free', icon: User }
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pb-20`}>
      <div className="p-4">
        {/* Card الرئيسي */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 mb-6 shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Profile
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* صورة الملف الشخصي */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className={`w-20 h-20 bg-gradient-to-br ${getThemeGradient(selectedThemeColor)} rounded-full flex items-center justify-center shadow-lg`}>
                {selectedAvatar ? (
                  <span className="text-3xl">
                    {selectedAvatar}
                  </span>
                ) : user?.picture ? (
                  <img 
                    src={user.picture} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-2xl">
                    {getInitials()}
                  </span>
                )}
              </div>
              {isEditing && (
                <button 
                  onClick={() => setShowImageUpload(true)}
                  className={`absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-br ${getThemeGradient(selectedThemeColor)} rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform`}
                >
                  <Camera className="w-3 h-3 text-white" />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={localUserData.name}
                  onChange={(e) => setLocalUserData({ ...localUserData, name: e.target.value })}
                  className={`w-full p-2 rounded-lg border ${
                    isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
              ) : (
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {getUserDisplayName()}
                </h3>
              )}
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {user?.email?.includes('premium') ? 'Premium Member' : 'Free Member'}
              </p>
            </div>
          </div>

          {/* معلومات المستخدم */}
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center space-x-3">
              <Mail className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              <div className="flex-1">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Email</span>
                <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {user?.email || 'Not provided'}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="flex items-center space-x-3">
              <User className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              <div className="flex-1">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Bio</span>
                {isEditing ? (
                  <textarea
                    value={localUserData.bio}
                    onChange={(e) => setLocalUserData({ ...localUserData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    className={`w-full p-2 rounded-lg border ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20 mt-1 resize-none`}
                    rows={2}
                  />
                ) : (
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>
                    {localUserData.bio || 'No bio added yet'}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-3">
              <MapPin className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              <div className="flex-1">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Location</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={localUserData.location}
                    onChange={(e) => setLocalUserData({ ...localUserData, location: e.target.value })}
                    placeholder="Your city, country"
                    className={`w-full p-2 rounded-lg border ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20 mt-1`}
                  />
                ) : (
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'} mt-1`}>
                    {localUserData.location || 'Location not set'}
                  </p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-3">
              <Phone className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              <div className="flex-1">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Phone</span>
                {isEditing ? (
                  <input
                    type="tel"
                    value={localUserData.phone}
                    onChange={(e) => setLocalUserData({ ...localUserData, phone: e.target.value })}
                    className={`w-full p-2 rounded-lg border ${
                      isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20 mt-1`}
                  />
                ) : (
                  <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {user?.phone_number || localUserData.phone || 'Not provided'}
                  </p>
                )}
              </div>
            </div>

            {/* Theme Color - يظهر فقط في وضع التعديل */}
            {isEditing && (
              <div className="space-y-3 mt-4">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Theme Color</span>
                <div className="grid grid-cols-3 gap-3">
                  {themeColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedThemeColor(color.value)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                        selectedThemeColor === color.value
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : isDark ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${color.gradient}`}></div>
                      <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* أزرار الحفظ والإلغاء */}
          {isEditing && (
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCancel}
                className={`flex-1 py-2 rounded-lg border ${
                  isDark ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                } transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`flex-1 py-2 bg-gradient-to-r ${getThemeGradient(selectedThemeColor)} hover:scale-105 text-white rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center`}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* قسم إحصائيات الحساب */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 mb-6 shadow-lg`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Account Statistics
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {profileStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <stat.icon className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* معلومات الحساب */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 mb-6 shadow-lg`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Account Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Account Created
              </span>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                User ID
              </span>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} truncate max-w-[120px]`}>
                {user?.id?.substring(0, 8) || 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Authentication
              </span>
              <span className="text-green-500 text-sm font-medium">
                {user?.email_verified ? 'Verified' : 'Not Verified'}
              </span>
            </div>
          </div>
        </div>

        {/* إجراءات الحساب */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Account Actions
          </h3>
          <div className="space-y-3">
            <button 
              onClick={handleLogout}
              className={`w-full flex items-center justify-center p-3 rounded-lg transition-colors ${
                isDark ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* نافذة اختيار الصورة */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Choose Profile Avatar
              </h3>
              <button
                onClick={() => setShowImageUpload(false)}
                className={`p-2 rounded-lg ${isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-3 mb-6">
              {avatarOptions.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedAvatar(avatar);
                    setShowImageUpload(false);
                  }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${
                    selectedAvatar === avatar
                      ? `bg-gradient-to-br ${getThemeGradient(selectedThemeColor)} scale-110 shadow-lg`
                      : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>

            <div className="border-t pt-4">
              <button
                onClick={() => {
                  setSelectedAvatar('');
                  setShowImageUpload(false);
                }}
                className={`w-full p-3 rounded-lg border-2 border-dashed transition-colors ${
                  isDark ? 'border-gray-600 text-gray-400 hover:border-gray-500' : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                <Upload className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm">Use Default Avatar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
