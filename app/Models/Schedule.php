<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Schedule extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['home_id', 'away_id', 'game_date', 'field_id', 'home_score',
    'away_score', 'started', 'completed', 'rescheduled', 'notes'];

    public function umpires()
    {
        return $this->belongsToMany(Umpire::class);
    }

    public function home_team()
    {
        return $this->belongsTo(Team::class, 'home_id');
    }

    public function away_team()
    {
        return $this->belongsTo(Team::class, 'away_id');
    }

    public function field()
    {
        return $this->belongsTo(Field::class, 'field_id');
    }
}
