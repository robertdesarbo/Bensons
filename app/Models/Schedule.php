<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = ['home_id', 'away_id', 'game_date', 'field_id', 'home_score',
    'away_score', 'started', 'completed', 'rescheduled', 'notes'];

    public function umpires()
    {
        return $this->belongsToMany(Umpire::class);
    }
}
