<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Season extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['division_id', 'start_at', 'active', 'number_of_games', 'league_fee', 'offical_fee_per_game'];

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id');
    }
}
