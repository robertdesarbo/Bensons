<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Division extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'league_id'];

    public function league()
    {
        return $this->belongsTo(League::class, 'league_id');
    }

    public function season()
    {
        return $this->hasMany(Season::class);
    }
}
