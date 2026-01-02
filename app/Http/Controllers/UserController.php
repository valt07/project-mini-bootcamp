<?php

namespace App\Http\Controllers;

use App\Models\User;
// use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use illuminate\Support\Facades\Hash;
use illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->user()->peran !== 'admin') {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }
        return User::latest('dibuat_pada')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->user()->peran !== 'admin') {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:pengguna',
            'kata_sandi' => 'required|string|min:8',
            'peran' => 'required|in:admin,author,editor',
        ]);

        $user = User::create([
            'nama' => $validated['nama'],
            'email' => $validated['email'],
            'kata_sandi' => Hash::make($validated['kata_sandi']),
            'peran' => $validated['peran'],
        ]);

        return response()->json($user, 201);
    }

    /**
     * Update user
     */
    public function update(Request $request, $id)
    {
        if ($request->user()->peran !== 'admin') {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }

        $user = User::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'sometimes|required|string|max:255',
            'email' => ['sometimes', 'required', 'email', Rule::unique('pengguna')->ignore($user->id)],
            'kata_sandi' => 'sometimes|nullable|string|min:8',
            'peran' => 'sometimes|required|in:admin,author,editor',
        ]);

        $user->fill($request->only(['nama', 'email', 'peran']));

        if (!empty($validated['kata_sandi'])) {
            $user->kata_sandi = Hash::make($validated['kata_sandi']);
        }
        $user->save();
        return response()->json($user);
    }

    //delete user
    public function destroy(Request $request, $id)
    {
        if ($request->user()->peran !== 'admin') {
            return response()->json(['message' => 'Akses ditolak.'], 403);
        }
        $user = User::findOrFail($id);

        //ptotection admin delete self
        if ($user->id === $request->user()->id) {
            return response()->json(['message' => 'Admin tidak dapat menghapus diri sendiri.'], 400);
        }

        $user->delete();
        return response()->json(['message' => 'Pengguna berhasil dihapus.']);
    }
}
