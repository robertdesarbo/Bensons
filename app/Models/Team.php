<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'abbreviation', 'division_id', 'active'];

    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class, 'division_id');
    }

    public function seasons(): BelongsToMany
    {
        return $this->belongsToMany(Season::class)->withTimestamps();
    }

    public function home(): HasMany
    {
        return $this->hasMany(Schedule::class, 'home_id', 'id');
    }

    public function away(): HasMany
    {
        return $this->hasMany(Schedule::class, 'away_id', 'id');
    }
}
