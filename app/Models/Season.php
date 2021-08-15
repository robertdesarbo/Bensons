<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Season extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['division_id', 'active', 'complete', 'start_at', 'number_of_games', 'league_fee', 'offical_fee_per_game'];

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id');
    }

    public function teams()
    {
        return $this->belongsToMany(Team::class)->withTimestamps();
    }

    public function scopeActive($query)
    {
        return $query->where('active', true)->where('complete', false);
    }

    public function scopePreviouslyCompleted($query)
    {
        return $query->where('active', true)->where('complete', true);
    }
}
