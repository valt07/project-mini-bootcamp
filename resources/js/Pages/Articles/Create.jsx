import React from 'react';
import MainLayout from '../Components/MainLayout';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        judul: '',
        isi: '',
        gambar: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Inertia otomatis menghandle FormData untuk file upload
        post('/articles');
    };

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl">
                <h1 className="text-2xl font-bold text-white mb-6">Buat Artikel Baru</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Judul Artikel</label>
                        <input 
                            type="text" 
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-indigo-500"
                            value={data.judul}
                            onChange={e => setData('judul', e.target.value)}
                        />
                        {errors.judul && <p className="text-red-500 text-xs mt-1">{errors.judul}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Konten</label>
                        <textarea 
                            rows="6"
                            className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-white focus:ring-indigo-500"
                            value={data.isi}
                            onChange={e => setData('isi', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Thumbnail Gambar</label>
                        <input 
                            type="file" 
                            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                            onChange={e => setData('gambar', e.target.files[0])}
                        />
                    </div>

                    <button 
                        disabled={processing}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition shadow-lg"
                    >
                        {processing ? 'Sedang Menyimpan...' : 'Simpan Artikel'}
                    </button>
                </form>
            </div>
        </MainLayout>
    );
}