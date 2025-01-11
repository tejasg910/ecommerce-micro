import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Lock, Calendar, CheckCircle, Loader2 } from 'lucide-react';
import { User as UserType } from '../../types/user';

type ProfileUpdateProps = {
  user: UserType | null;
  onUpdate: (updatedUser: Partial<Omit<UserType, 'id' | 'email' | 'createdAt' | 'updatedAt'>>) => void;
};

export default function ProfileUpdate({ user, onUpdate }: ProfileUpdateProps) {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    address: user?.address || '',
    password: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName,
        address: user.address || ''
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsUpdating(true);
    try {
      await onUpdate({
        fullName: formData.fullName,
        address: formData.address,
        password: formData.password || undefined
      });
      setFormData(prev => ({ ...prev, password: '' }));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">No user data available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
          <h1 className="text-2xl font-semibold text-white">Profile Settings</h1>
          <p className="text-orange-100 mt-1">Manage your account information</p>
        </div>

        <div className="p-6">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">{new Date(user.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Field */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="bg-gray-50 text-gray-500 focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Full Name Field */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Address Field */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4">
              {showSuccess && (
                <div className="flex items-center text-green-600 space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Profile updated successfully</span>
                </div>
              )}
              <button
                type="submit"
                disabled={isUpdating}
                className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Updating...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}