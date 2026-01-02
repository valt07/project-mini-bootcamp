<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artikel extends Model
{
    use HasFactory;

    protected $table = 'artikel';

    // Konfigurasi nama kolom timestamp custom
    const CREATED_AT = 'dibuat_pada';
    const UPDATED_AT = 'diubah_pada';

    protected $fillable = [
        'judul',
        'gambar',
        'slug',
        'isi',
        'id_penulis',
        'status',
        'tgl_publikasi'
    ];

    protected $casts = [
        'tgl_publikasi' => 'datetime',
    ];

    // Relasi ke Model User (Penulis)
    public function penulis()
    {
        return $this->belongsTo(User::class, 'id_penulis');
    }
}
