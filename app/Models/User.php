<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'pengguna';

    const CREATED_AT = 'dibuat_pada';
    const UPDATED_AT = 'diubah_pada';

    protected $fillable = [
        'nama',
        'email',
        'kata_sandi',
        'peran',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'kata_sandi',
        'remember_token',
    ];

    // Override Default Password Column
    public function getAuthPassword()
    {
        return $this->kata_sandi;
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'kata_sandi' => 'hashed',
        ];
    }

    //Relasi ke artikel
    public function articles()
    {
        return $this->hasMany(Article::class, 'id_penulis');
    }
}
