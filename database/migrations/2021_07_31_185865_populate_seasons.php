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
                'start_at' => Carbon::createFromDate('2021', '04', '19'),
                'active' => true,
                'number_of_games' => 14,
                'league_fee' => 895,
                'offical_fee_per_game' => 28,
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
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Season::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
