<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FieldLocation extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'address', 'city', 'state', 'zip', 'active'];

    public function fields()
    {
        return $this->hasMany(Field::class);
    }
}
