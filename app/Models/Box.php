<?php

namespace App\Models;

use Database\Factories\BoxFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Box extends Model
{
    /** @use HasFactory<BoxFactory> */
    use HasFactory;

    protected $fillable = ['name', 'weight', 'picture'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
