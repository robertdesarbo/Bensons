<?php

namespace Database\Seeders;

use Carbon\Carbon;

use App\Models\Team;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\Models\Division;

class TeamsSeeder extends Seeder
{
    /**
    * Run the database seeds.
    *
    * @return void
    */
    public function run()
    {
        Team::factory()->count(100)->create();
    }
}
