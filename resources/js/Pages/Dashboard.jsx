import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [stats, setStats] = useState({ published: 0, review: 0, draft: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.peran === 'admin') {
            fetchStats();
        } else {
            setLoading(false);
        }
    }, [user.peran]);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(response.data);
        } catch (error) {
            console.error('Failed to fetch stats');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-gray-100">Halo, {user.nama}</h3>
                    <p className="text-gray-400 text-sm mt-1 capitalize">Role: <span className="text-indigo-400 font-semibold">{user.peran}</span></p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>

            {/* Admin Stats */}
            {user.peran === 'admin' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 p-6 rounded-xl">
                        <h3 className="text-green-400 text-sm font-medium uppercase tracking-wider">Artikel Terbit</h3>
                        <p className="text-3xl font-bold text-green-100 mt-2">{stats.published}</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 p-6 rounded-xl">
                        <h3 className="text-yellow-400 text-sm font-medium uppercase tracking-wider">Menunggu Review</h3>
                        <p className="text-3xl font-bold text-yellow-100 mt-2">{stats.review}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 p-6 rounded-xl">
                        <h3 className="text-blue-400 text-sm font-medium uppercase tracking-wider">Total Draft</h3>
                        <p className="text-3xl font-bold text-blue-100 mt-2">{stats.draft}</p>
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <h3 className="text-lg font-semibold text-gray-200 border-l-4 border-indigo-500 pl-3">Aksi Cepat</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.peran === 'author' && (
                    <Link to="/articles/create" className="bg-gray-700/50 hover:bg-gray-700 p-4 rounded-lg border border-gray-600 hover:border-indigo-500 transition-all group">
                        <span className="text-2xl mb-2 block">✏️</span>
                        <h4 className="font-bold text-gray-200 group-hover:text-indigo-400">Tulis Artikel Baru</h4>
                        <p className="text-sm text-gray-400 mt-1">Mulai buat draf berita.</p>
                    </Link>
                )}

                {(user.peran === 'admin' || user.peran === 'editor') && (
                    <Link to="/articles" className="bg-gray-700/50 hover:bg-gray-700 p-4 rounded-lg border border-gray-600 hover:border-indigo-500 transition-all group">
                        <span className="text-2xl mb-2 block">📋</span>
                        <h4 className="font-bold text-gray-200 group-hover:text-indigo-400">Kelola Artikel</h4>
                        <p className="text-sm text-gray-400 mt-1">Review, Publish, atau Hapus.</p>
                    </Link>
                )}

                {user.peran === 'admin' && (
                    <Link to="/users" className="bg-gray-700/50 hover:bg-gray-700 p-4 rounded-lg border border-gray-600 hover:border-indigo-500 transition-all group">
                        <span className="text-2xl mb-2 block">👥</span>
                        <h4 className="font-bold text-gray-200 group-hover:text-indigo-400">Kelola Pengguna</h4>
                        <p className="text-sm text-gray-400 mt-1">Tambah atau edit user.</p>
                    </Link>
                )}
            </div>
        </div>
    );
}
