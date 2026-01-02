import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserIndex() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ id: null, nama: '', email: '', peran: 'author', kata_sandi: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Auth check
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (currentUser.peran !== 'admin') {
        return <div className="text-red-500">Akses Ditolak.</div>;
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/pengguna', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            if (isEditing) {
                await axios.put(`/api/pengguna/${form.id}`, form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('/api/pengguna', form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchUsers();
            setShowModal(false);
            resetForm();
        } catch (error) {
            alert('Gagal menyimpan data.');
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus pengguna ini?')) return;
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`/api/pengguna/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchUsers();
        } catch (error) {
            alert('Gagal menghapus pengguna.');
        }
    };

    const resetForm = () => {
        setForm({ id: null, nama: '', email: '', peran: 'author', kata_sandi: '' });
        setIsEditing(false);
    };

    const openEdit = (user) => {
        setForm({ ...user, kata_sandi: '' }); // Don't show password
        setIsEditing(true);
        setShowModal(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-100">Kelola Pengguna</h1>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    + Tambah User
                </button>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <table className="w-full text-left text-gray-300">
                    <thead className="bg-gray-700 text-gray-400 uppercase text-xs font-bold">
                        <tr>
                            <th className="px-6 py-3">Nama</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Peran</th>
                            <th className="px-6 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {users.map(u => (
                            <tr key={u.id} className="hover:bg-gray-700/50 transition-colors">
                                <td className="px-6 py-4">{u.nama}</td>
                                <td className="px-6 py-4">{u.email}</td>
                                <td className="px-6 py-4 capitalize">
                                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${u.peran === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                                            u.peran === 'editor' ? 'bg-blue-500/20 text-blue-400' :
                                                'bg-gray-500/20 text-gray-400'
                                        }`}>
                                        {u.peran}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => openEdit(u)} className="text-indigo-400 hover:text-indigo-300 text-sm">Edit</button>
                                    <button onClick={() => handleDelete(u.id)} className="text-red-400 hover:text-red-300 text-sm">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md border border-gray-700">
                        <h2 className="text-xl font-bold mb-4 text-gray-100">{isEditing ? 'Edit Pengguna' : 'Tambah Pengguna'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Nama</label>
                                <input className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white"
                                    value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Email</label>
                                <input type="email" className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white"
                                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Peran</label>
                                <select className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white"
                                    value={form.peran} onChange={e => setForm({ ...form, peran: e.target.value })}>
                                    <option value="author">Author</option>
                                    <option value="editor">Editor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Password {isEditing && '(Kosongkan jika tidak berubah)'}</label>
                                <input type="password" className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white"
                                    value={form.kata_sandi} onChange={e => setForm({ ...form, kata_sandi: e.target.value })}
                                    required={!isEditing} minLength="8" />
                            </div>
                            <div className="flex justify-end space-x-2 mt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400">Batal</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
