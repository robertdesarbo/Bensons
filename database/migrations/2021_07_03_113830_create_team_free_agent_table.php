<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeamFreeAgentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('team_free_agents', function (Blueprint $table) {
            $table->id();
            $table->string('team_id')->constrained('teams')->unique();
            $table->string('captain_name');
            $table->string('phone');
            $table->string('email');
            $table->json('positions');
            $table->enum('genders', ['male', 'female', 'both']);
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
        Schema::dropIfExists('team_free_agents');
    }
}
