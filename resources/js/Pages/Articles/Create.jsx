import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ArticleCreate() {
    const [judul, setJudul] = useState('');
    const [isi, setIsi] = useState('');
    const [gambar, setGambar] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('judul', judul);
        formData.append('isi', isi);
        if (gambar) formData.append('gambar', gambar);

        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/articles', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/articles');
        } catch (error) {
            console.error('Failed to create article', error);
            alert(error.response?.data?.message || 'Gagal membuat artikel.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-100 mb-6">Tulis Artikel Baru</h1>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Judul</label>
                        <input
                            type="text"
                            value={judul}
                            onChange={e => setJudul(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
                            placeholder="Judul artikel..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Gambar Sampul</label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="file"
                                onChange={e => setGambar(e.target.files[0])}
                                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                                accept="image/*"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Konten</label>
                        <textarea
                            value={isi}
                            onChange={e => setIsi(e.target.value)}
                            rows="10"
                            className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500"
                            placeholder="Tulis konten berita..."
                            required
                        ></textarea>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button type="button" onClick={() => navigate('/articles')} className="px-4 py-2 text-gray-400 hover:text-white">
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition-all disabled:opacity-50"
                        >
                            {loading ? 'Menyimpan...' : 'Simpan Draft'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
