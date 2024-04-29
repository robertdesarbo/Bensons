<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DivisionFreeAgent extends Model
{
    use HasFactory;

    protected $table = 'division_free_agent';

    protected $fillable = ['free_agent_id', 'division_id'];

    public function freeAgent(): BelongsTo
    {
        return $this->belongsTo(FreeAgent::class, 'free_agent_id');
    }

    public function division(): BelongsTo
    {
        return $this->belongsTo(Division::class, 'division_id');
    }
}
