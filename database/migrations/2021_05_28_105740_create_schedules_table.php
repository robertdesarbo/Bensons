<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('home_id')->constrained('teams');
            $table->foreignId('away_id')->constrained('teams');
            $table->dateTime('game_date', $precision = 0);
            $table->foreignId('field_id')->constrained('fields');
            // $table->foreignId('umpire_id')->constrained('fields');
            $table->integer('home_score');
            $table->integer('away_score');
            $table->boolean('started')->nullable();
            $table->boolean('completed')->nullable();
            $table->boolean('rescheduled')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedules');
    }
}
