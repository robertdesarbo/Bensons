<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('home_id')->constrained('teams');
            $table->foreignId('away_id')->constrained('teams');
            $table->dateTime('game_date', $precision = 0);
            $table->foreignId('field_id')->constrained('fields');
            $table->integer('home_score')->nullable();
            $table->integer('away_score')->nullable();
            $table->boolean('delayed')->default(false);
            $table->boolean('completed')->default(false);
            $table->boolean('rescheduled')->default(false);
            $table->boolean('canceled')->default(false);
            $table->text('notes')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
