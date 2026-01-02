import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // First get CSRF cookie if using Sanctum stateful, but for API setup we just hit endpoint
            // await axios.get('/sanctum/csrf-cookie'); 

            const response = await axios.post('/api/login', { email, password });

            const { access_token, user } = response.data;

            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed. Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                    HeadlineCore
                </h2>
                <p className="mt-2 text-sm text-gray-400">Sign in to manage your content</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded text-sm text-center">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-500 transition-all"
                        placeholder="admin@example.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-500 transition-all"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <div className="mt-4 text-center text-xs text-gray-500">
                <p>Default Accounts:</p>
                <p>admin@example.com / password</p>
                <p>editor@example.com / password</p>
            </div>
        </div>
    );
}
