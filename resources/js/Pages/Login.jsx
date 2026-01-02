import React from 'react';
import GuestLayout from '@/Components/GuestLayout';
import { useForm, Head } from '@inertiajs/react';

export default function Login() {
    // useForm Inertia menangani state dan validasi error dari backend secara otomatis
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'), // Reset field password saja jika gagal
        });
    };

    return (
        <GuestLayout>
            <Head title="Admin Login" />

            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-white">LOGIN ADMIN</h2>
                <p className="text-gray-500 text-sm mt-1">Masukkan kredensial untuk akses CMS</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                        type="email"
                        className={`w-full bg-gray-900 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-xl p-3.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                        placeholder="admin@cms.news"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold italic">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        placeholder="••••••••"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold italic">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center text-gray-400 cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="mr-2 rounded border-gray-700 bg-gray-900 text-indigo-600 focus:ring-0"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        Ingat Saya
                    </label>
                    <a href="#" className="text-indigo-400 hover:text-indigo-300 font-bold">Lupa Password?</a>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] disabled:opacity-50"
                >
                    {processing ? 'MENGOTENTIKASI...' : 'MASUK KE DASHBOARD'}
                </button>
            </form>
        </GuestLayout>
    );
}