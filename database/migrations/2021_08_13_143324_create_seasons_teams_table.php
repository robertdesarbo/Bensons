<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use Carbon\Carbon;

use App\Models\Team;

class CreateSeasonsTeamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('season_team', function (Blueprint $table) {
            $table->foreignId('season_id')->constrained('seasons');
            $table->foreignId('team_id')->constrained('teams');
            $table->primary(['season_id', 'team_id']);
            $table->timestamps();
        });

        $teams = Team::get();

        foreach ($teams as $team) {
            //first works here because there is only 1 season
            $team->season()->attach($team->division->season->first()->id);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('seasons_teams');
    }
}
