<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreeAgent extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'phone', 'email', 'gender', 'division_id'];

    public function divisions()
    {
        return $this->belongsToMany(Division::class)->withTimestamps();
    }
}
