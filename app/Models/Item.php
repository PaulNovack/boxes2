<?php

namespace App\Models;

use Database\Factories\ItemFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    /** @use HasFactory<ItemFactory> */
    use HasFactory;

    protected $fillable = ['name', 'quantity', 'picture', 'box_id'];

    public function box(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Box::class);
    }
}
