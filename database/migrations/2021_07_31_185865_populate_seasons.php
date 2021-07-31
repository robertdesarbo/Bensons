<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use Carbon\Carbon;

use App\Models\Division;
use App\Models\Season;

class PopulateSeasons extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $divisions = Division::get();

        // create one season for each division
        foreach ($divisions as $division) {
            Season::create([
                'division_id' => $division->id,
                'start' => Carbon::createFromDate('2021', '04', '19'),
                'number_of_games' => 14,
                'team_cost' => 895,
                'officials_cost' => 392,
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Season::truncate();
    }
}
