import React, { useState } from 'react';
import MainLayout from '@/Components/MainLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function UserIndex({ users, auth }) {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Inertia useForm untuk handle state form & pengiriman data
    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        id: null,
        name: '',
        email: '',
        peran: 'author',
        password: '',
    });

    // Proteksi di sisi Client (Sangat disarankan juga di sisi Server/Controller)
    if (auth.user.peran !== 'admin') {
        return (
            <MainLayout>
                <div className="p-4 bg-red-500/20 text-red-400 rounded-lg border border-red-500/50">
                    Akses Ditolak. Anda bukan Admin.
                </div>
            </MainLayout>
        );
    }

    const openCreate = () => {
        reset();
        setIsEditing(false);
        setShowModal(true);
    };

    const openEdit = (user) => {
        setData({
            id: user.id,
            name: user.name,
            email: user.email,
            peran: user.peran,
            password: '', // Password dikosongkan saat edit
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('users.update', data.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('users.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Yakin hapus pengguna ini?')) {
            destroy(route('users.destroy', id));
        }
    };

    const closeModal = () => {
        setShowModal(false);
        reset();
    };

    return (
        <MainLayout>
            <Head title="Kelola Pengguna" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-100">Kelola Pengguna</h1>
                <button
                    onClick={openCreate}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20"
                >
                    + Tambah User
                </button>
            </div>

            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                <table className="w-full text-left text-gray-300">
                    <thead className="bg-gray-700/50 text-gray-400 uppercase text-xs font-bold">
                        <tr>
                            <th className="px-6 py-4">Nama</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Peran</th>
                            <th className="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {users.map((u) => (
                            <tr key={u.id} className="hover:bg-gray-700/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">{u.name}</td>
                                <td className="px-6 py-4 text-gray-400">{u.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold ${
                                        u.peran === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                                        u.peran === 'editor' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                        'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                                    }`}>
                                        {u.peran}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <button onClick={() => openEdit(u)} className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold">Edit</button>
                                    <button onClick={() => handleDelete(u.id)} className="text-red-400 hover:text-red-300 text-sm font-semibold">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Form */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-md border border-gray-700 shadow-2xl shadow-black">
                        <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-4">
                            {isEditing ? '📝 Edit Pengguna' : '👤 Tambah Pengguna'}
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Nama Lengkap</label>
                                <input 
                                    className={`w-full bg-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg p-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500`}
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)} 
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                <input 
                                    type="email" 
                                    className={`w-full bg-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg p-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500`}
                                    value={data.email} 
                                    onChange={e => setData('email', e.target.value)} 
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Role / Peran</label>
                                <select 
                                    className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={data.peran} 
                                    onChange={e => setData('peran', e.target.value)}
                                >
                                    <option value="author">Author</option>
                                    <option value="editor">Editor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Password {isEditing && <span className="text-xs italic text-gray-500">(Kosongkan jika tidak ganti)</span>}
                                </label>
                                <input 
                                    type="password" 
                                    className={`w-full bg-gray-900 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg p-2.5 text-white outline-none focus:ring-2 focus:ring-indigo-500`}
                                    value={data.password} 
                                    onChange={e => setData('password', e.target.value)} 
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <div className="flex justify-end space-x-3 mt-8">
                                <button 
                                    type="button" 
                                    onClick={closeModal} 
                                    className="px-4 py-2 text-gray-400 hover:text-white transition"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Data'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}