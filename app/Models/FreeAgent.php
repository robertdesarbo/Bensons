<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreeAgent extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'phone', 'email', 'division_id'];

    public function division()
    {
        return $this->belongsToMany(Division::class);
    }
}
