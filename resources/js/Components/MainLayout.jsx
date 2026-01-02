import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout', {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
        } catch (e) { console.error(e); }
        finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '📊', roles: ['admin', 'editor', 'author'] },
        { name: 'Artikel', path: '/articles', icon: '📝', roles: ['admin', 'editor', 'author'] },
        { name: 'Pengguna', path: '/users', icon: '👥', roles: ['admin'] },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-gray-700">
                    <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 block">
                        HeadlineCore
                    </Link>
                    <p className="text-xs text-gray-400 mt-1 capitalize">{user.peran || 'Guest'}</p>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.filter(item => item.roles.includes(user.peran)).map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname.startsWith(item.path)
                                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                                    : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                                }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 border border-red-500/20">
                        Keluar
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                <header className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 p-4 sticky top-0 z-20 shadow-md">
                    <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
                        <h2 className="text-xl font-semibold text-gray-100">
                            {navItems.find(i => location.pathname.startsWith(i.path))?.name || 'Dashboard'}
                        </h2>
                        <div className="flex items-center space-x-4">
                            <Link to="/" className="text-sm text-indigo-400 hover:text-indigo-300">Lihat Website &rarr;</Link>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                {user.nama ? user.nama.charAt(0).toUpperCase() : 'U'}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
