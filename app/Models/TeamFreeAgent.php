<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamFreeAgent extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'phone', 'email', 'positions', 'genders'];

    protected $casts = [
        'positions' => 'array',
        'genders' => 'array'
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
