import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Landing({ articles }) {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
            <Head title="Berita Terkini - Portal Berita" />

            {/* Navbar Publik */}
            <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <h1 className="text-2xl font-black text-indigo-500 tracking-tighter">CMS.NEWS</h1>
                    <Link href="/login" className="text-sm font-bold bg-gray-800 hover:bg-gray-700 px-5 py-2 rounded-full border border-gray-700 transition">
                        Admin Login
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="py-20 px-6 text-center">
                <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                    Informasi Terpercaya <br /> Di Ujung Jari Anda.
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Dapatkan update terbaru mengenai teknologi, koding, dan ekosistem Laravel langsung dari kontributor kami.
                </p>
            </header>

            {/* News Grid */}
            <main className="max-w-7xl mx-auto px-6 pb-20">
                <div className="flex items-center space-x-4 mb-10">
                    <div className="h-px bg-gray-800 flex-1"></div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Berita Terbaru</span>
                    <div className="h-px bg-gray-800 flex-1"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles && articles.length > 0 ? articles.map((article) => (
                        <article key={article.id} className="group cursor-pointer">
                            <div className="aspect-video bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 mb-4">
                                {article.gambar ? (
                                    <img src={`/storage/${article.gambar}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={article.judul} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600 italic">No Image</div>
                                )}
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-indigo-400 transition mb-2 leading-snug">
                                {article.judul}
                            </h3>
                            <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                                {article.isi}
                            </p>
                            <div className="flex items-center text-xs text-gray-400 font-medium">
                                <span>Oleh {article.user?.name || 'Author'}</span>
                                <span className="mx-2">•</span>
                                <span>{new Date(article.created_at).toLocaleDateString()}</span>
                            </div>
                        </article>
                    )) : (
                        <div className="col-span-full text-center py-20 text-gray-600">
                            Belum ada berita yang diterbitkan.
                        </div>
                    )}
                </div>
            </main>

            <footer className="border-t border-gray-800 py-10 text-center text-gray-600 text-sm">
                &copy; 2026 CMS.NEWS Project. All rights reserved.
            </footer>
        </div>
    );
}