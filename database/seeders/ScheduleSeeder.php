<?php

namespace Database\Seeders;

use Carbon\Carbon;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use App\Models\Schedule;

use App\Models\Team;
use App\Models\Field;
use App\Models\Umpire;

class ScheduleSeeder extends Seeder
{
    /**
    * Run the database seeds.
    *
    * @return void
    */
    public function run()
    {
        $schedule = Schedule::create([
            'home_id' => Team::where('abbreviation', 'MIS')->first()->id,
            'away_id' => Team::where('abbreviation', 'HIT')->first()->id,
            'game_date' => Carbon::parse('April 25, 2021 10:30:00 AM')->format('Y-m-d H:i:s'),
            'field_id' => Field::where('name', 'Feura Bush')->first()->id,
            'home_score' => 8,
            'away_score' => 16,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);

        $schedule->umpires()->attach(Umpire::where('name', 'Pete Benson')->first()->id);
    }
}
