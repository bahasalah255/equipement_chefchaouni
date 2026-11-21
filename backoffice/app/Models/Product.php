<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['category_id', 'name', 'slug', 'sku', 'brand', 'price', 'image', 'description', 'featured', 'active'];
    protected $casts = ['price' => 'decimal:2', 'featured' => 'boolean', 'active' => 'boolean'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
