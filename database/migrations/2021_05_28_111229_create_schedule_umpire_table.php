<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('schedule_umpire', function (Blueprint $table) {
            $table->foreignId('umpire_id')->constrained('umpires');
            $table->foreignId('schedule_id')->constrained('schedules');
            $table->primary(['umpire_id', 'schedule_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule_umpire');
    }
};
