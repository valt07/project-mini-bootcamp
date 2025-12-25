<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model {
    protected $fillable = [
        'user_id',
        'category_id',
        'slug',
        'status',
        'views',
    ];

    public function author() {
        return $this->belongsTo(User::class);
    }
    
    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function translations() {
        return $this->hasMany(Translation::class);
    }
    
}
