<?php

use App\Models\Schedule;
use App\Models\Team;
use Illuminate\Database\Migrations\Migration;

class PopulateSeasonForSchedule extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $teams = Team::get();

        foreach ($teams as $team) {
            //first works here because there is only 1 season
            Schedule::where('home_id', $team->id)->orWhere('away_id', $team->id)->update(['season_id' => $team->division->season->first()->id]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schedule::where('id', '>', 0)->update(['season_id' => null]);
    }
}
