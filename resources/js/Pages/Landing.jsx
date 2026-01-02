import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function LandingPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [readArticle, setReadArticle] = useState(null); // For modal/view

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/api/articles?status=publish'); // Explicitly public/publish
                setArticles(response.data);
            } catch (error) {
                console.error('Failed to fetch', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-indigo-500 selection:text-white pb-20">
            {/* Navbar */}
            <nav className="border-b border-gray-800 bg-gray-900/90 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 cursor-pointer" onClick={() => setReadArticle(null)}>
                            HeadlineCore
                        </span>
                        <Link to="/login" className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                            Login (Admin/Editor/Author)
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Read Mode (Simple Overlay/Modal usage for SPA feel or routing) 
                For simplicity in "Landing.jsx", we can conditionally render the list vs detail 
                or use a separate route. Since requirement is simple public read, I'll do conditional view here 
                to keep it in one public "Landing" experience without complicated public routing.
            */}

            {readArticle ? (
                // Article Detail View
                <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
                    <button onClick={() => setReadArticle(null)} className="mb-8 flex items-center text-gray-400 hover:text-indigo-400 transition-colors">
                        &larr; Kembali ke Berita
                    </button>

                    {readArticle.gambar && (
                        <img src={`/storage/${readArticle.gambar}`} alt={readArticle.judul} className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl mb-8" />
                    )}

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{readArticle.judul}</h1>

                    <div className="flex items-center space-x-4 mb-8 text-sm text-gray-400 border-b border-gray-800 pb-8">
                        <span className="bg-gray-800 px-3 py-1 rounded-full text-indigo-400 font-medium">
                            {readArticle.penulis?.nama || 'Redaksi'}
                        </span>
                        <span>
                            {new Date(readArticle.tgl_publikasi || readArticle.dibuat_pada).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed whitespace-pre-line">
                        {readArticle.isi}
                    </div>
                </article>

            ) : (
                // Article List View
                <>
                    {/* Hero */}
                    <div className="relative border-b border-gray-800 bg-gray-800/20">
                        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
                            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                                Portal Berita <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Terkini</span>
                            </h1>
                            <p className="max-w-2xl mx-auto text-xl text-gray-400">
                                Berita aktual, terpercaya, dan mendalam dari berbagai penjuru dunia.
                            </p>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10">
                        {loading ? (
                            <div className="bg-gray-800 p-8 rounded-2xl text-center text-gray-500">Memuat berita...</div>
                        ) : articles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {articles.map((article) => (
                                    <div key={article.id} onClick={() => setReadArticle(article)} className="group cursor-pointer bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 shadow-lg">
                                        <div className="h-48 overflow-hidden bg-gray-900 relative">
                                            {article.gambar ? (
                                                <img src={`/storage/${article.gambar}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold text-2xl bg-gray-800">NEWS</div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center text-xs text-indigo-400 mb-3 font-semibold uppercase tracking-wider">
                                                {new Date(article.tgl_publikasi || article.dibuat_pada).toLocaleDateString('id-ID')}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
                                                {article.judul}
                                            </h3>
                                            <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4">
                                                {article.isi}
                                            </p>
                                            <span className="text-indigo-400 font-medium text-sm group-hover:underline decoration-indigo-500/50">Baca Selengkapnya &rarr;</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-800 rounded-3xl">
                                <p className="text-gray-400 text-lg">Belum ada berita yang diterbitkan.</p>
                            </div>
                        )}
                    </div>
                </>
            )}

            <footer className="mt-20 border-t border-gray-800 py-10 text-center text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} HeadlineCore - Portal Berita Modern.
            </footer>
        </div>
    );
}
