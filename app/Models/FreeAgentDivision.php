<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FreeAgentDivision extends Model
{
    use HasFactory;

    protected $table = 'free_agent_division';

    protected $fillable = ['free_agent_id', 'division_id'];

    public function freeAgent()
    {
        return $this->belongsTo(FreeAgent::class, 'free_agent_id');
    }

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id');
    }
}
