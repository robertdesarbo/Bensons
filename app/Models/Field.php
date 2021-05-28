<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'address', 'address', 'city', 'state', 'zip',
    'alcohol', 'private_property', 'pets', 'smoking', 'ground_rules'];
        
}
