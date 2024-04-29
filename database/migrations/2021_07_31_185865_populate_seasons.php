<?php

use App\Models\Division;
use App\Models\Season;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        $divisions = Division::get();

        // create one season for each division
        foreach ($divisions as $division) {
            Season::create([
                'division_id' => $division->id,
                'start_at' => Carbon::createFromDate('2021', '04', '26'),
                'active' => true,
                'number_of_games' => 14,
                'league_fee' => 1125,
                'offical_fee_per_game' => 28,
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Season::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
};
