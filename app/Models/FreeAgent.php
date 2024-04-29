<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class FreeAgent extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'phone', 'email', 'gender', 'division_id'];

    public function divisions(): BelongsToMany
    {
        return $this->belongsToMany(Division::class)->withTimestamps();
    }
}
