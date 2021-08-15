<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'abbreviation', 'division_id', 'active'];

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id');
    }

    public function seasons()
    {
        return $this->belongsToMany(Season::class)->withTimestamps();
    }

    public function home()
    {
        return $this->hasMany(Schedule::class, 'home_id', 'id');
    }

    public function away()
    {
        return $this->hasMany(Schedule::class, 'away_id', 'id');
    }
}
