<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    use HasFactory;

    protected $fillable = ['field_location_id', 'number', 'name', 'alcohol', 'private_property', 'pets', 'smoking', 'ground_rules', 'sport', 'lights', 'active'];

    public function field_location(): BelongsTo
    {
        return $this->belongsTo(FieldLocation::class, 'field_location_id');
    }
}
