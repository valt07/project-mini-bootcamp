import React from 'react';
import MainLayout from '@/Components/MainLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    // Dummy stats jika belum ada data dari backend
    const dataStats = stats || [
        { name: 'Total Artikel', value: '128', icon: '📰', color: 'bg-blue-500' },
        { name: 'Artikel Review', value: '12', icon: '⏳', color: 'bg-yellow-500' },
        { name: 'Total Pengguna', value: '15', icon: '👥', color: 'bg-purple-500' },
        { name: 'Draft Saya', value: '4', icon: '📝', color: 'bg-gray-500' },
    ];

    return (
        <MainLayout>
            <Head title="Dashboard CMS" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Selamat Datang, {auth.user.name}! 👋</h1>
                <p className="text-gray-400 mt-2">Berikut adalah ringkasan aktivitas CMS Berita hari ini.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {dataStats.map((stat, index) => (
                    <div key={index} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg hover:border-indigo-500/50 transition-all group">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.name}</p>
                                <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
                            </div>
                            <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-xs text-green-400">
                            <span>▲ 12% dari minggu lalu</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-gray-800 rounded-2xl border border-gray-700 p-6 shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                        <span className="mr-2">🔥</span> Artikel Terbaru
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:bg-gray-700/30 transition">
                                <div className="w-12 h-12 bg-gray-700 rounded-lg mr-4"></div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-gray-200">Tips Koding Laravel Modern 2026</h4>
                                    <p className="text-xs text-gray-500">Oleh: Author • 2 jam yang lalu</p>
                                </div>
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-[10px] font-bold uppercase">Published</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-4">Aksi Cepat</h3>
                    <div className="grid grid-cols-1 gap-3">
                        <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition">
                            📝 Buat Artikel Baru
                        </button>
                        <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition text-sm">
                            ⚙️ Pengaturan Profil
                        </button>
                        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mt-4">
                            <p className="text-xs text-indigo-300 leading-relaxed">
                                <strong>Tips:</strong> Pastikan gambar artikel memiliki rasio 16:9 untuk tampilan terbaik di Landing Page.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}