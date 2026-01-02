import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ArticleEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [article, setArticle] = useState({ judul: '', isi: '', status: '', gambar: null });
    const [newImage, setNewImage] = useState(null);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isEditor = user.peran === 'editor';
    const isAdmin = user.peran === 'admin';
    const isAuthor = user.peran === 'author';

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/articles/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setArticle(response.data);
        } catch (error) {
            console.error(error);
            navigate('/articles');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (newStatus) => {
        setSaving(true);
        const formData = new FormData();

        // Use method spoofing for Laravel PUT with Files
        formData.append('_method', 'PUT');

        // Status override or current
        const statusToUse = typeof newStatus === 'string' ? newStatus : article.status;
        formData.append('status', statusToUse);

        // Only add fields if not Admin (Admin only changes status via buttons, or simple unpublish)
        if (!isAdmin) {
            formData.append('judul', article.judul);
            formData.append('isi', article.isi);
            if (newImage) formData.append('gambar', newImage);
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(`/api/articles/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/articles');
        } catch (error) {
            console.error('Failed to update article', error);
            alert(error.response?.data?.message || 'Gagal memperbarui artikel.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center mt-10 text-gray-400">Memuat...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-100">
                    {isEditor ? 'Review Artikel' : isAdmin ? 'Kelola Artikel' : 'Edit Artikel'}
                </h1>
                <span className={`px-3 py-1 rounded text-sm capitalize font-bold ${article.status === 'publish' ? 'bg-green-500/20 text-green-400' :
                        article.status === 'review' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                    }`}>
                    Status: {article.status}
                </span>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Content Editor */}
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Judul</label>
                        <input
                            type="text"
                            value={article.judul}
                            onChange={e => setArticle({ ...article, judul: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-100"
                            disabled={!isAuthor}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Konten</label>
                        <textarea
                            value={article.isi}
                            onChange={e => setArticle({ ...article, isi: e.target.value })}
                            rows="15"
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-100"
                            disabled={!isAuthor}
                        ></textarea>
                    </div>
                </div>

                {/* Sidebar: Image & Actions */}
                <div className="space-y-6">
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Gambar</label>
                        {article.gambar ? (
                            <img src={`/storage/${article.gambar}`} alt="Cover" className="w-full h-40 object-cover rounded-md mb-2" />
                        ) : (
                            <div className="w-full h-40 bg-gray-800 rounded-md mb-2 flex items-center justify-center text-gray-500 text-xs">No Image</div>
                        )}

                        {isAuthor && (
                            <input
                                type="file"
                                onChange={e => setNewImage(e.target.files[0])}
                                className="block w-full text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-gray-700 file:text-white"
                                accept="image/*"
                            />
                        )}
                    </div>

                    <div className="space-y-3">
                        {isAuthor && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => handleUpdate('draft')}
                                    className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors border border-gray-600"
                                >
                                    Simpan sebagai Draft
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleUpdate('review')}
                                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow"
                                >
                                    Submit untuk Review
                                </button>
                            </>
                        )}

                        {isEditor && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => handleUpdate('publish')}
                                    className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow mb-2"
                                >
                                    Publish (Terbitkan)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleUpdate('draft')} // Or specific 'reject' status if implemented
                                    className="w-full py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg transition-colors"
                                >
                                    Reject (Kembalikan ke Author)
                                </button>
                            </>
                        )}

                        {isAdmin && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => handleUpdate('draft')} // Unpublish -> draft
                                    className="w-full py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-500 border border-yellow-500/30 rounded-lg transition-colors"
                                >
                                    Unpublish (Tarik Berita)
                                </button>
                                {/* Delete is in List view, but added here for completeness if needed */}
                            </>
                        )}

                        <button
                            type="button"
                            onClick={() => navigate('/articles')}
                            className="w-full py-2 text-gray-400 hover:text-white text-sm"
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
