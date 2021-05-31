<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'abbreviation', 'division_id'];

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id');
    }
}
