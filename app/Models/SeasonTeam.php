<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeasonTeam extends Model
{
    use HasFactory;

    protected $table = 'season_team';

    protected $fillable = ['season_id', 'team_id'];

    public function season()
    {
        return $this->belongsTo(Season::class, 'season_id');
    }

    public function team()
    {
        return $this->belongsTo(Team::class, 'team_id');
    }
}
