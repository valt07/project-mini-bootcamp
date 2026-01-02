<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Artikel', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('gambar')->nullable(); // Kolom untuk path gambar
            $table->string('slug')->unique(); // Slug unik untuk SEO
            $table->text('isi');
            
            // Relasi ke tabel pengguna
            $table->foreignId('id_penulis')->constrained('users')->onDelete('cascade');
            
            // Status alur kerja: Draft -> Review -> Publish
            $table->enum('status', ['draft', 'review', 'publish'])->default('draft');
            $table->timestamp('tgl_publikasi')->nullable();
            
            // Timestamp Bahasa Indonesia
            $table->timestamp('dibuat_pada')->useCurrent();
            $table->timestamp('diubah_pada')->useCurrent()->useCurrentOnUpdate();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Artikel');
    }
};
