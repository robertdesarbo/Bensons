<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use Carbon\Carbon;

use App\Models\Team;
use App\Models\Schedule;

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
