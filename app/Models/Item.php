<?php

namespace App\Models;

use Database\Factories\ItemFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read Box $box
 */
class Item extends Model
{
    /** @use HasFactory<ItemFactory> */
    use HasFactory;

    protected $fillable = ['name', 'quantity', 'picture', 'box_id'];

    /** @return BelongsTo<Box, $this> */
    public function box(): BelongsTo
    {
        return $this->belongsTo(Box::class);
    }
}
