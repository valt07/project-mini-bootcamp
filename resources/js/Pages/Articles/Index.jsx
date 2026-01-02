import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ArticleIndex() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.peran === 'admin';
    const isEditor = user.peran === 'editor';
    const isAuthor = user.peran === 'author';

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/articles', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setArticles(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus artikel ini?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/articles/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchArticles();
        } catch (error) {
            alert('Gagal menghapus artikel (Mungkin akses ditolak).');
        }
    };

    if (loading) return <div className="text-gray-400 text-center mt-10">Memuat...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-100">Daftar Artikel</h1>
                {isAuthor && (
                    <Link to="/articles/create" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-colors font-medium">
                        + Tulis Artikel
                    </Link>
                )}
            </div>

            <div className="grid gap-4">
                {articles.length === 0 ? (
                    <div className="text-gray-500 text-center py-10 bg-gray-800 rounded-xl border border-gray-700">
                        Tidak ada artikel ditemukan.
                    </div>
                ) : (
                    articles.map(article => (
                        <div key={article.id} className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-sm hover:shadow-md transition-all flex justify-between items-start">
                            <div className="flex space-x-4">
                                {article.gambar ? (
                                    <img src={`/storage/${article.gambar}`} className="w-24 h-24 object-cover rounded-lg bg-gray-900" alt="Thumb" />
                                ) : (
                                    <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center text-xs text-gray-400">No Image</div>
                                )}
                                <div>
                                    <div className="flex items-center space-x-3 mb-1">
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${article.status === 'publish' ? 'bg-green-500/20 text-green-400' :
                                                article.status === 'review' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-gray-500/20 text-gray-400'
                                            }`}>
                                            {article.status}
                                        </span>
                                        <span className="text-gray-500 text-xs">{new Date(article.dibuat_pada).toLocaleDateString('id-ID')}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-100 mb-1 leading-tight">{article.judul}</h3>
                                    <p className="text-gray-400 text-xs mb-2">Penulis: {article.penulis?.nama || 'Unknown'}</p>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <Link
                                    to={`/articles/${article.id}/edit`}
                                    className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-xs text-center border border-gray-600"
                                >
                                    {isEditor ? 'Review' : isAdmin ? 'Kelola' : 'Edit'}
                                </Link>

                                {isAdmin && (
                                    <button
                                        onClick={() => handleDelete(article.id)}
                                        className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-xs border border-red-500/20"
                                    >
                                        Hapus
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
