<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Realisation extends Model
{
    protected $table = 'realisations';
    protected $fillable = ['title', 'slug', 'client', 'location', 'cover', 'description', 'images', 'featured', 'active'];
    protected $casts = ['images' => 'array', 'featured' => 'boolean', 'active' => 'boolean'];
}
