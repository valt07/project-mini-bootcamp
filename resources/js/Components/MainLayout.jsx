import React from 'react';
import { Link } from 'react-router-dom'; // atau @inertiajs/react

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Navbar */}
            <nav className="bg-gray-800 border-b border-gray-700 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-indigo-500 mr-8">CMS Admin</span>
                            <div className="hidden space-x-4 sm:flex">
                                <Link to="/articles" className="hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">Artikel</Link>
                                <Link to="/users" className="hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">User Management</Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-400 italic">Halo, Editor</span>
                            <button className="bg-red-600/20 text-red-400 hover:bg-red-600/30 px-3 py-1 rounded border border-red-500/50 text-xs">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content Area */}
            <main className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}