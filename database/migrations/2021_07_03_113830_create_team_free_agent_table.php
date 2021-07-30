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
            $table->string('team_id')->constrained('teams')->unique()->nullable();
            $table->string('name');
            $table->string('phone');
            $table->string('email')->unique();
            $table->json('positions');
            $table->json('genders');
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
