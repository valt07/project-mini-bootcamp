import React from 'react';
import MainLayout from '../Components/MainLayout';
import { Link } from '@inertiajs/react'; // Gunakan Link agar navigasi cepat

export default function Index({ articles }) {
    return (
        <MainLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Daftar Artikel</h1>
                <Link 
                    href="/articles/create" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                    + Tambah Artikel Baru
                </Link>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
                <table className="w-full text-left">
                    <thead className="bg-gray-700 text-gray-300 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-4">Judul</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 text-gray-300">
                        {articles.map((article) => (
                            <tr key={article.id} className="hover:bg-gray-750 transition">
                                <td className="px-6 py-4 font-medium">{article.judul}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                                        article.status === 'publish' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                        {article.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link 
                                        href={`/articles/${article.id}/edit`} 
                                        className="text-indigo-400 hover:text-indigo-300 font-semibold"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MainLayout>
    );
}