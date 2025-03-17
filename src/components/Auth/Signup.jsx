import React, { useState } from 'react';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        confirmPassword: '',
        agreeTerms: false
    });
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNotification({
            show: true,
            message: 'Creating account...',
            type: 'success'
        });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex overflow-hidden">
            {/* Left Section */}
            <div className="hidden lg:flex w-1/2 bg-cover bg-center relative overflow-hidden"
                style={{
                    backgroundImage: "url('https://public.readdy.ai/ai/img_res/038d1613043af9349cec4ff4fc387962.jpg')"
                }}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-indigo-900/90 backdrop-blur-sm">
                    <div className="flex flex-col justify-center h-full px-12 text-white">
                        <h1 className="text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">Vulnerability Management System</h1>
                        <p className="text-xl mb-12 leading-relaxed text-blue-100">Secure your infrastructure with advanced vulnerability tracking and management solutions.</p>
                        <div className="space-y-4">
                            <div className="space-y-6">
                                <div className="flex items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm transform transition-transform hover:scale-105">
                                    <i className="fas fa-shield-alt text-2xl mr-4 text-blue-300"></i>
                                    <span className="text-lg">Real-time threat detection</span>
                                </div>
                                <div className="flex items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm transform transition-transform hover:scale-105">
                                    <i className="fas fa-chart-line text-2xl mr-4 text-blue-300"></i>
                                    <span className="text-lg">Advanced analytics dashboard</span>
                                </div>
                                <div className="flex items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm transform transition-transform hover:scale-105">
                                    <i className="fas fa-lock text-2xl mr-4 text-blue-300"></i>
                                    <span className="text-lg">Enterprise-grade security</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Section */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 bg-white shadow-2xl relative">
                <div className="absolute top-0 right-0 w-full h-40 bg-gradient-to-b from-blue-50/30 to-transparent"></div>
                <div className="max-w-md w-full mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block p-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 mb-4 shadow-lg shadow-blue-100 transform hover:scale-105 transition-transform duration-300">
                            <i className="fas fa-shield-alt text-5xl text-blue-600 animate-pulse"></i>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
                        <p className="text-gray-600">Start your security journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 bg-gray-50/50 shadow-sm"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 bg-gray-50/50 shadow-sm"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 bg-gray-50/50 shadow-sm"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 bg-gray-50/50 shadow-sm"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                required
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                                I agree to the Terms and Conditions
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-700 transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 !rounded-button whitespace-nowrap backdrop-blur-sm"
                        >
                            Create Account
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <button
                                type="button"
                                className="flex items-center justify-center px-4 py-3.5 border border-gray-300 rounded-xl shadow-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transform transition-all duration-300 hover:scale-[1.02] hover:border-gray-400 cursor-pointer !rounded-button whitespace-nowrap backdrop-blur-sm"
                            >
                                <i className="fab fa-google text-red-500 mr-2"></i>
                                Google
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center px-4 py-3.5 border border-gray-300 rounded-xl shadow-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transform transition-all duration-300 hover:scale-[1.02] hover:border-gray-400 cursor-pointer !rounded-button whitespace-nowrap backdrop-blur-sm"
                            >
                                <i className="fab fa-github mr-2"></i>
                                GitHub
                            </button>
                        </div>

                        <div className="text-center mt-4">
                            <a href="/login" className="text-sm text-blue-600 hover:text-blue-500 cursor-pointer">
                                Already have an account? Sign in
                            </a>
                        </div>
                    </form>

                    {notification.show && (
                        <div className={`fixed bottom-4 right-4 px-6 py-4 rounded-xl text-white shadow-xl backdrop-blur-sm transform transition-all duration-300 ${
                            notification.type === 'success' ? 'bg-gradient-to-r from-green-500/90 to-green-600/90' : 'bg-gradient-to-r from-red-500/90 to-red-600/90'
                        } animate-fade-in-up flex items-center gap-2`}>
                            <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-xl`}></i>
                            {notification.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
