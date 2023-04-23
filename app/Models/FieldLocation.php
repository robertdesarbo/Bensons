<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FieldLocation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'address', 'city', 'state', 'zip', 'active'];

    public function schedule()
    {
        return $this->belongsTo(Schedule::class, 'id', 'field_location_id');
    }

    public function fields()
    {
        return $this->hasMany(Field::class);
    }
}
