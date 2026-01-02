import React, { useEffect } from 'react';
import MainLayout from '../Components/MainLayout';
import { useForm, usePage } from '@inertiajs/react';

export default function Edit({ article }) {
    // Inisialisasi form dengan data artikel yang ada
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', // Method spoofing untuk Laravel
        judul: article.judul || '',
        isi: article.isi || '',
        status: article.status || 'draft',
        gambar: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kita gunakan post karena multipart/form-data tidak dukung PUT secara native
        // Tapi kita sudah tambahkan _method: 'PUT' di state data
        post(`/articles/${article.id}`);
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Edit Artikel: <span className="text-indigo-400">{article.judul}</span></h1>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        article.status === 'publish' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                        Status: {article.status}
                    </span>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Kolom Kiri: Input Text */}
                    <div className="lg:col-span-2 space-y-6 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Judul</label>
                            <input 
                                type="text"
                                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={data.judul}
                                onChange={e => setData('judul', e.target.value)}
                            />
                            {errors.judul && <p className="text-red-500 text-xs mt-1">{errors.judul}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Konten</label>
                            <textarea 
                                rows="12"
                                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={data.isi}
                                onChange={e => setData('isi', e.target.value)}
                            />
                            {errors.isi && <p className="text-red-500 text-xs mt-1">{errors.isi}</p>}
                        </div>
                    </div>

                    {/* Kolom Kanan: Gambar & Actions */}
                    <div className="space-y-6">
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
                            <label className="block text-gray-400 text-sm mb-4">Thumbnail Saat Ini</label>
                            {article.gambar ? (
                                <img 
                                    src={`/storage/${article.gambar}`} 
                                    className="w-full h-40 object-cover rounded-lg mb-4 border border-gray-600"
                                    alt="Preview"
                                />
                            ) : (
                                <div className="w-full h-40 bg-gray-900 rounded-lg mb-4 flex items-center justify-center text-gray-600 border border-dashed border-gray-600">
                                    No Image
                                </div>
                            )}
                            
                            <label className="block text-gray-400 text-sm mb-2">Ganti Gambar (Opsional)</label>
                            <input 
                                type="file"
                                className="block w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-600 cursor-pointer"
                                onChange={e => setData('gambar', e.target.files[0])}
                            />
                        </div>

                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg space-y-3">
                            <button 
                                type="submit"
                                disabled={processing}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition shadow-indigo-500/20 shadow-lg disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Update Artikel'}
                            </button>
                            
                            <a 
                                href="/articles" 
                                className="block text-center w-full text-gray-400 hover:text-white py-2 text-sm transition"
                            >
                                Batal
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}