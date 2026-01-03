<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ArtikelController extends Controller
{
    use AuthorizesRequests;
    public function index(Request $request)
    {
        $query = Artikel::with('penulis')->latest('dibuat_pada');

        // Cek user dengan guard sanctum karena route ini mungkin public
        $user = $request->user('sanctum');

        if ($user) {
            if ($user->peran === 'author') {
                $query->where('id_penulis', $user->id);
            }
            // Editor & Admin see all
        } else {
            $query->where('status', 'publish');
        }
        
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return $query->get();
    }
    public function store(Request $request)
    {
        $user = $request->user();
        
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        
        $imagePath = null;
        if ($request->hasFile('gambar')) {
             $imagePath = $request->file('gambar')->store('artikel_images', 'public');
        }

        $article = Artikel::create([
            'judul' => $validated['judul'],
            'slug' => Str::slug($validated['judul']) . '-' . Str::random(5),
            'isi' => $validated['isi'],
            'gambar' => $imagePath,
            'id_penulis' => $user->id,
            'status' => 'draft',
        ]);

        return response()->json($article, 201);
    }

    public function update(Request $request, $id)
    {
        $article = artikel::findOrFail($id);
        $user = $request->user();

        if ($user->peran === 'author' && $article->id_penulis !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        if ($user->peran === 'admin') {
             $validated = $request->validate(['status' => 'required']);
             $article->status = $validated['status'];
             $article->save();
             return response()->json($article);
        }

        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'isi' => 'sometimes|required|string',
            'status' => 'sometimes|in:draft,review,publish,reject', 
            'gambar' => 'nullable|image|max:2048',
        ]);

        if ($user->peran === 'author' && isset($validated['status']) && $validated['status'] === 'publish') {
             return response()->json(['message' => 'Author tidak boleh publish langsung.'], 403);
        }

        if ($request->hasFile('gambar')) {
             if ($article->gambar) Storage::disk('public')->delete($article->gambar);
             $article->gambar = $request->file('gambar')->store('artikel_images', 'public');
        }

        if (isset($validated['judul'])) {
            $article->judul = $validated['judul'];
            $article->slug = Str::slug($validated['judul']) . '-' . Str::random(5);
        }
        if (isset($validated['isi'])) $article->isi = $validated['isi'];
        if (isset($validated['status'])) {
            $article->status = $validated['status'];
            if ($validated['status'] === 'publish') $article->tgl_publikasi = now();
        }

        $article->save();
        return response()->json($article);
    }
    
    public function destroy(Request $request, $id)
    {
        if ($request->user()->peran !== 'admin') {
             return response()->json(['message' => 'Hanya Admin yang dapat menghapus.'], 403);
        }
        $article = Artikel::findOrFail($id);
        if ($article->gambar) Storage::disk('public')->delete($article->gambar);
        $article->delete();
        return response()->json(['message' => 'Berhasil dihapus']);
    }

    public function show($id)
    {
        $article = Artikel::with('penulis')->find($id);
        if (!$article) return response()->json(['message' => 'Not Found'], 404);
        return $article;
    }

    public function stats()
    {
        return response()->json([
            'published' => Artikel::where('status', 'publish')->count(),
            'review' => Artikel::where('status', 'review')->count(),
            'draft' => Artikel::where('status', 'draft')->count(),
        ]);
    }
}
