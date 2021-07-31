<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Season extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['division_id', 'start', 'number_of_games', 'team_cost', 'officials_cost'];

    public function league()
    {
        return $this->belongsTo(Division::class, 'division_id');
    }
}
