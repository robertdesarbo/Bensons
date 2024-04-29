<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Umpire extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function schedules(): BelongsToMany
    {
        return $this->belongsToMany(Schedule::class);
    }
}
