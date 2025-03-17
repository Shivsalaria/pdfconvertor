// import React, { useState } from 'react';
// const App = () => {
// const [showPassword, setShowPassword] = useState(false);
// const [formData, setFormData] = useState({
// email: '',
// password: '',
// rememberMe: false
// });
// const [notification, setNotification] = useState({ show: false, message: '', type: '' });
// const handleInputChange = (e) => {
// const { name, value, type, checked } = e.target;
// setFormData(prev => ({
// ...prev,
// [name]: type === 'checkbox' ? checked : value
// }));
// };
// const handleSubmit = (e) => {
// e.preventDefault();
// setNotification({
// show: true,
// message: 'Logging in...',
// type: 'success'
// });
// setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
// };
// return (
// <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex overflow-hidden">
// {/* Left Section */}
// <div className="hidden lg:flex w-1/2 bg-cover bg-center relative overflow-hidden"
// style={{
// backgroundImage: "url('https://public.readdy.ai/ai/img_res/038d1613043af9349cec4ff4fc387962.jpg')"
// }}>
// <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-indigo-900/90 backdrop-blur-sm">
// <div className="flex flex-col justify-center h-full px-12 text-white">
// <h1 className="text-5xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">Vulnerability Management System</h1>
// <p className="text-xl mb-12 leading-relaxed text-blue-100">Secure your infrastructure with advanced vulnerability tracking and management solutions.</p>
// <div className="space-y-4">
// <div className="space-y-6">
// <div className="flex items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm transform transition-transform hover:scale-105">
// <i className="fas fa-shield-alt text-2xl mr-4 text-blue-300"></i>
// <span className="text-lg">Real-time threat detection</span>
// </div>
// <div className="flex items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm transform transition-transform hover:scale-105">
// <i className="fas fa-chart-line text-2xl mr-4 text-blue-300"></i>
// <span className="text-lg">Advanced analytics dashboard</span>
// </div>
// <div className="flex items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm transform transition-transform hover:scale-105">
// <i className="fas fa-lock text-2xl mr-4 text-blue-300"></i>
// <span className="text-lg">Enterprise-grade security</span>
// </div>
// </div>
// </div>
// </div>
// </div>
// </div>
// {/* Right Section */}
// <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 bg-white shadow-2xl relative">
// <div className="absolute top-0 right-0 w-full h-40 bg-gradient-to-b from-blue-50/30 to-transparent"></div>
// <div className="max-w-md w-full mx-auto">
// <div className="text-center mb-12">
// <div className="inline-block p-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 mb-4 shadow-lg shadow-blue-100 transform hover:scale-105 transition-transform duration-300">
// <i className="fas fa-shield-alt text-5xl text-blue-600 animate-pulse"></i>
// </div>
// <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
// <p className="text-gray-600">Sign in to your account</p>
// </div>
// <form onSubmit={handleSubmit} className="space-y-6">
// <div>
// <label className="block text-sm font-medium text-gray-700">Email address</label>
// <input
// type="email"
// name="email"
// value={formData.email}
// onChange={handleInputChange}
// className="mt-1 block w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 bg-gray-50/50 shadow-sm"
// placeholder="Enter your email"
// required
// />
// </div>
// <div>
// <label className="block text-sm font-medium text-gray-700">Password</label>
// <div className="relative">
// <input
// type={showPassword ? 'text' : 'password'}
// name="password"
// value={formData.password}
// onChange={handleInputChange}
// className="mt-1 block w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 bg-gray-50/50 shadow-sm"
// placeholder="Enter your password"
// required
// />
// <button
// type="button"
// onClick={() => setShowPassword(!showPassword)}
// className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
// >
// <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
// </button>
// </div>
// </div>
// <div className="flex items-center justify-between">
// <div className="flex items-center">
// <input
// type="checkbox"
// name="rememberMe"
// checked={formData.rememberMe}
// onChange={handleInputChange}
// className="h-4 w-4 text-blue-600 border-gray-300 rounded"
// />
// <label className="ml-2 block text-sm text-gray-700">Remember me</label>
// </div>
// <button type="button" className="text-sm text-blue-600 hover:text-blue-500">
// Forgot password?
// </button>
// </div>
// <button
// type="submit"
// className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-700 transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 !rounded-button whitespace-nowrap backdrop-blur-sm"
// >
// Sign in
// </button>
// <div className="relative">
// <div className="absolute inset-0 flex items-center">
// <div className="w-full border-t border-gray-300"></div>
// </div>
// <div className="relative flex justify-center text-sm">
// <span className="px-2 bg-white text-gray-500">Or continue with</span>
// </div>
// </div>
// <div className="grid grid-cols-2 gap-4 mt-2">
// <button
// type="button"
// className="flex items-center justify-center px-4 py-3.5 border border-gray-300 rounded-xl shadow-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transform transition-all duration-300 hover:scale-[1.02] hover:border-gray-400 cursor-pointer !rounded-button whitespace-nowrap backdrop-blur-sm"
// >
// <i className="fab fa-google text-red-500 mr-2"></i>
// Google
// </button>
// <button
// type="button"
// className="flex items-center justify-center px-4 py-3.5 border border-gray-300 rounded-xl shadow-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transform transition-all duration-300 hover:scale-[1.02] hover:border-gray-400 cursor-pointer !rounded-button whitespace-nowrap backdrop-blur-sm"
// >
// <i className="fab fa-github mr-2"></i>
// GitHub
// </button>
// </div>
// </form>
// {notification.show && (
// <div className={`fixed bottom-4 right-4 px-6 py-4 rounded-xl text-white shadow-xl backdrop-blur-sm transform transition-all duration-300 ${
// notification.type === 'success' ? 'bg-gradient-to-r from-green-500/90 to-green-600/90' : 'bg-gradient-to-r from-red-500/90 to-red-600/90'
// } animate-fade-in-up flex items-center gap-2`}>
// <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-xl`}></i>
// {notification.message}
// </div>
// )}
// </div>
// </div>
// </div>
// );
// };
// export default App


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // For now, just set a dummy token and redirect
        localStorage.setItem('token', 'dummy-token');
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
