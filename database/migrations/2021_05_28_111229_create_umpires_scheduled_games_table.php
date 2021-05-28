<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUmpiresScheduledGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('umpires_scheduled_games', function (Blueprint $table) {
            $table->foreignId('umpire_id')->constrained('umpires');
            $table->foreignId('schedule_id')->constrained('schedules');
            $table->primary(['umpire_id', 'schedule_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('umpires_scheduled_games');
    }
}
