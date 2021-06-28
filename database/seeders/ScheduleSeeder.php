<?php

namespace Database\Seeders;

use Carbon\Carbon;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\Models\Schedule;

class ScheduleSeeder extends Seeder
{
    /**
    * Run the database seeds.
    *
    * @return void
    */
    public function run()
    {
        Schedule::factory()->count(1000)->create();
    }
}
