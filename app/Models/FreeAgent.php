<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreeAgent extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'phone', 'email', 'gender', 'division_id'];

    public function divisions(): BelongsToMany
    {
        return $this->belongsToMany(Division::class)->withTimestamps();
    }
}
