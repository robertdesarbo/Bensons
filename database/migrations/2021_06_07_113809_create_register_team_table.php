<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegisterTeamTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('register_teams', function (Blueprint $table) {
            $table->id();
            $table->string('team_name');
            $table->string('captain_name');
            $table->string('phone');
            $table->string('email');
            $table->foreignId('division_id')->constrained('divisions');
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
        Schema::dropIfExists('register_teams');
    }
}
