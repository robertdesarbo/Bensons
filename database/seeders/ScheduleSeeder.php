<?php

namespace Database\Seeders;

use Carbon\Carbon;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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
        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'MIS')->first()->id,
                'away_id' => Team::where('abbreviation', 'HIT')->first()->id,
                'game_date' => Carbon::parse('April 25, 2021 10:30:00 AM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'home_score' => 8,
                'away_score' => 16,
                'completed' => true
            ],
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Pete Benson')->first()->id);


        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'TKS')->first()->id,
                'away_id' => Team::where('abbreviation', 'GIA')->first()->id,
                'game_date' => Carbon::parse('April 25, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'rescheduled' => true
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Chris Arndt')->first()->id);


        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'FVS')->first()->id,
                'away_id' => Team::where('abbreviation', 'FAK')->first()->id,
                'game_date' => Carbon::parse('April 25, 2021 01:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'home_score' => 3,
                'away_score' => 15,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Chris Arndt')->first()->id);


        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'TBS')->first()->id,
                'away_id' => Team::where('abbreviation', 'HHS')->first()->id,
                'game_date' => Carbon::parse('April 25, 2021 01:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'home_score' => 4,
                'away_score' => 12,
                'completed' => true,
            ]
        );

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'H4I')->first()->id,
                'away_id' => Team::where('abbreviation', 'CAK')->first()->id,
                'game_date' => Carbon::parse('April 25, 2021 03:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'home_score' => 9,
                'away_score' => 6,
                'completed' => true,
            ]
        );

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'BCS')->first()->id,
                'away_id' => Team::where('abbreviation', '518')->first()->id,
                'game_date' => Carbon::parse('April 25, 2021 04:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'home_score' => 18,
                'away_score' => 14,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Dan Bifani')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'BRJ')->first()->id,
                'away_id' => Team::where('abbreviation', 'PUB')->first()->id,
                'game_date' => Carbon::parse('April 25, 2021 06:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'home_score' => 1,
                'away_score' => 14,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Dan Bifani')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'GIA')->first()->id,
                'away_id' => Team::where('abbreviation', 'TBS')->first()->id,
                'game_date' => Carbon::parse('May 2, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'home_score' => 5,
                'away_score' => 8,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Dan Bifani')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'TTB')->first()->id,
                'away_id' => Team::where('abbreviation', 'BCS')->first()->id,
                'game_date' => Carbon::parse('May 2, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'home_score' => 10,
                'away_score' => 22,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Dan Bifani')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', '518')->first()->id,
                'away_id' => Team::where('abbreviation', 'TTB')->first()->id,
                'game_date' => Carbon::parse('May 2, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'rescheduled' => true
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Tyler Connolly')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'FAK')->first()->id,
                'away_id' => Team::where('abbreviation', 'MIS')->first()->id,
                'game_date' => Carbon::parse('May 2, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'home_score' => 14,
                'away_score' => 15,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Jeremy Putorti')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'HHS')->first()->id,
                'away_id' => Team::where('abbreviation', 'CAK')->first()->id,
                'game_date' => Carbon::parse('May 2, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'rescheduled' => true
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Jeremy Putorti')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'PUB')->first()->id,
                'away_id' => Team::where('abbreviation', 'TKS')->first()->id,
                'game_date' => Carbon::parse('May 2, 2021 4:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'rescheduled' => true
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Linwood Jenkins')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'H4I')->first()->id,
                'away_id' => Team::where('abbreviation', 'BRJ')->first()->id,
                'game_date' => Carbon::parse('May 2, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Firemans')->first()->id,
                'home_score' => 14,
                'away_score' => 15,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Greg Briggs')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'HIT')->first()->id,
                'away_id' => Team::where('abbreviation', 'FVS')->first()->id,
                'game_date' => Carbon::parse('May 2, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Firemans')->first()->id,
                'home_score' => 12,
                'away_score' => 1,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Greg Briggs')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'GIA')->first()->id,
                'away_id' => Team::where('abbreviation', 'HHS')->first()->id,
                'game_date' => Carbon::parse('May 16, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'home_score' => 14,
                'away_score' => 15,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Jeremy Putorti')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'TBS')->first()->id,
                'away_id' => Team::where('abbreviation', 'H4I')->first()->id,
                'game_date' => Carbon::parse('May 16, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'home_score' => 7,
                'away_score' => 6,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Jeremy Putorti')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'MIS')->first()->id,
                'away_id' => Team::where('abbreviation', '518')->first()->id,
                'game_date' => Carbon::parse('May 16, 2021 10:30:00 AM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'home_score' => 18,
                'away_score' => 3,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Dan Bifani')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'TTB')->first()->id,
                'away_id' => Team::where('abbreviation', 'FAK')->first()->id,
                'game_date' => Carbon::parse('May 16, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'rescheduled' => true
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Dan Bifani')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'BRJ')->first()->id,
                'away_id' => Team::where('abbreviation', 'TKS')->first()->id,
                'game_date' => Carbon::parse('May 16, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'home_score' => 21,
                'away_score' => 4,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Greg Briggs')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'PUB')->first()->id,
                'away_id' => Team::where('abbreviation', 'TKS')->first()->id,
                'game_date' => Carbon::parse('May 16, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'home_score' => 17,
                'away_score' => 12,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Greg Briggs')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'CAK')->first()->id,
                'away_id' => Team::where('abbreviation', 'PUB')->first()->id,
                'game_date' => Carbon::parse('May 16, 2021 4:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'home_score' => 3,
                'away_score' => 5,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Linwood Jenkins')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'BCS')->first()->id,
                'away_id' => Team::where('abbreviation', 'FVS')->first()->id,
                'game_date' => Carbon::parse('May 16, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Firemans')->first()->id,
                'home_score' => 25,
                'away_score' => 11,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Pete Benson')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'H4I')->first()->id,
                'away_id' => Team::where('abbreviation', 'GIA')->first()->id,
                'game_date' => Carbon::parse('May 23, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'home_score' => 6,
                'away_score' => 12,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Greg Briggs')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'HHS')->first()->id,
                'away_id' => Team::where('abbreviation', 'BRJ')->first()->id,
                'game_date' => Carbon::parse('May 23, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'home_score' => 13,
                'away_score' => 11,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Greg Briggs')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'FVS')->first()->id,
                'away_id' => Team::where('abbreviation', 'MIS')->first()->id,
                'game_date' => Carbon::parse('May 23, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'home_score' => 4,
                'away_score' => 11,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Greg Briggs')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'TKS')->first()->id,
                'away_id' => Team::where('abbreviation', 'CAK')->first()->id,
                'game_date' => Carbon::parse('May 23, 2021 10:30:00 AM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'home_score' => 21,
                'away_score' => 15,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Jeremy Putorti')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'FAK')->first()->id,
                'away_id' => Team::where('abbreviation', '518')->first()->id,
                'game_date' => Carbon::parse('May 23, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'home_score' => 12,
                'away_score' => 17,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Jeremy Putorti')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'HIT')->first()->id,
                'away_id' => Team::where('abbreviation', 'BCS')->first()->id,
                'game_date' => Carbon::parse('May 23, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'home_score' => 7,
                'away_score' => 22,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Dan Bifani')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'TTB')->first()->id,
                'away_id' => Team::where('abbreviation', 'HIT')->first()->id,
                'game_date' => Carbon::parse('May 23, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'home_score' => 16,
                'away_score' => 6,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Dan Bifani')->first()->id);

        $schedule = Schedule::create(
            [
                'home_id' => Team::where('abbreviation', 'PUB')->first()->id,
                'away_id' => Team::where('abbreviation', 'TBS')->first()->id,
                'game_date' => Carbon::parse('May 23, 2021 4:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'home_score' => 14,
                'away_score' => 6,
                'completed' => true,
            ]
        );
        $schedule->umpires()->attach(Umpire::where('name', 'Linwood Jenkins')->first()->id);

        DB::table('schedules')->insert(
            [
            [
                'home_id' => Team::where('abbreviation', 'MIS')->first()->id,
                'away_id' => Team::where('abbreviation', 'BCS')->first()->id,
                'game_date' => Carbon::parse('June 6, 2021 10:30:00 AM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', '518')->first()->id,
                'away_id' => Team::where('abbreviation', 'FVS')->first()->id,
                'game_date' => Carbon::parse('June 6, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'FVS')->first()->id,
                'away_id' => Team::where('abbreviation', 'TTB')->first()->id,
                'game_date' => Carbon::parse('June 6, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'BRJ')->first()->id,
                'away_id' => Team::where('abbreviation', 'TBS')->first()->id,
                'game_date' => Carbon::parse('June 6, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'TKS')->first()->id,
                'away_id' => Team::where('abbreviation', 'HHS')->first()->id,
                'game_date' => Carbon::parse('June 6, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'HIT')->first()->id,
                'away_id' => Team::where('abbreviation', 'FAK')->first()->id,
                'game_date' => Carbon::parse('June 6, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'CAK')->first()->id,
                'away_id' => Team::where('abbreviation', 'GIA')->first()->id,
                'game_date' => Carbon::parse('June 6, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Firemans')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'GIA')->first()->id,
                'away_id' => Team::where('abbreviation', 'PUB')->first()->id,
                'game_date' => Carbon::parse('June 6, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Firemans')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'PUB')->first()->id,
                'away_id' => Team::where('abbreviation', 'H4I')->first()->id,
                'game_date' => Carbon::parse('June 6, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Firemans')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'HHS')->first()->id,
                'away_id' => Team::where('abbreviation', 'H4I')->first()->id,
                'game_date' => Carbon::parse('June 13, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'HHS')->first()->id,
                'away_id' => Team::where('abbreviation', 'PUB')->first()->id,
                'game_date' => Carbon::parse('June 13, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', '518')->first()->id,
                'away_id' => Team::where('abbreviation', 'HIT')->first()->id,
                'game_date' => Carbon::parse('June 13, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'TBS')->first()->id,
                'away_id' => Team::where('abbreviation', 'CAK')->first()->id,
                'game_date' => Carbon::parse('June 13, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'TKS')->first()->id,
                'away_id' => Team::where('abbreviation', 'TBS')->first()->id,
                'game_date' => Carbon::parse('June 13, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'GIA')->first()->id,
                'away_id' => Team::where('abbreviation', 'BRJ')->first()->id,
                'game_date' => Carbon::parse('June 13, 2021 4:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'BCS')->first()->id,
                'away_id' => Team::where('abbreviation', 'TTB')->first()->id,
                'game_date' => Carbon::parse('June 13, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Firemans')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'MIS')->first()->id,
                'away_id' => Team::where('abbreviation', 'FVS')->first()->id,
                'game_date' => Carbon::parse('June 13, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Firemans')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'HIT')->first()->id,
                'away_id' => Team::where('abbreviation', 'MIS')->first()->id,
                'game_date' => Carbon::parse('June 27, 2021 10:30:00 AM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'TTB')->first()->id,
                'away_id' => Team::where('abbreviation', 'MIS')->first()->id,
                'game_date' => Carbon::parse('June 27, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'TTB')->first()->id,
                'away_id' => Team::where('abbreviation', '518')->first()->id,
                'game_date' => Carbon::parse('June 27, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', '518')->first()->id,
                'away_id' => Team::where('abbreviation', 'TTB')->first()->id,
                'game_date' => Carbon::parse('June 27, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'TBS')->first()->id,
                'away_id' => Team::where('abbreviation', 'GIA')->first()->id,
                'game_date' => Carbon::parse('June 27, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'FAK')->first()->id,
                'away_id' => Team::where('abbreviation', 'BCS')->first()->id,
                'game_date' => Carbon::parse('June 27, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'FAK')->first()->id,
                'away_id' => Team::where('abbreviation', 'FVS')->first()->id,
                'game_date' => Carbon::parse('June 27, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'H4I')->first()->id,
                'away_id' => Team::where('abbreviation', 'TKS')->first()->id,
                'game_date' => Carbon::parse('June 27, 2021 4:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'BRJ')->first()->id,
                'away_id' => Team::where('abbreviation', 'HHS')->first()->id,
                'game_date' => Carbon::parse('June 27, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Firemans')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'HHS')->first()->id,
                'away_id' => Team::where('abbreviation', 'CAK')->first()->id,
                'game_date' => Carbon::parse('June 27, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Firemans')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'PUB')->first()->id,
                'away_id' => Team::where('abbreviation', 'CAK')->first()->id,
                'game_date' => Carbon::parse('June 27, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Firemans')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'BRJ')->first()->id,
                'away_id' => Team::where('abbreviation', 'H4I')->first()->id,
                'game_date' => Carbon::parse('July 11, 2021 10:30:00 AM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'CAK')->first()->id,
                'away_id' => Team::where('abbreviation', 'TBS')->first()->id,
                'game_date' => Carbon::parse('July 11, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'CAK')->first()->id,
                'away_id' => Team::where('abbreviation', 'TKS')->first()->id,
                'game_date' => Carbon::parse('July 11, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'MIS')->first()->id,
                'away_id' => Team::where('abbreviation', 'FAK')->first()->id,
                'game_date' => Carbon::parse('July 11, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'PUB')->first()->id,
                'away_id' => Team::where('abbreviation', 'HHS')->first()->id,
                'game_date' => Carbon::parse('July 11, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'HIT')->first()->id,
                'away_id' => Team::where('abbreviation', 'TTB')->first()->id,
                'game_date' => Carbon::parse('July 11, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', '518')->first()->id,
                'away_id' => Team::where('abbreviation', 'BCS')->first()->id,
                'game_date' => Carbon::parse('July 11, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'FVS')->first()->id,
                'away_id' => Team::where('abbreviation', '518')->first()->id,
                'game_date' => Carbon::parse('July 11, 2021 4:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'HHS')->first()->id,
                'away_id' => Team::where('abbreviation', 'GIA')->first()->id,
                'game_date' => Carbon::parse('July 18, 2021 10:30:00 AM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'GIA')->first()->id,
                'away_id' => Team::where('abbreviation', 'TKS')->first()->id,
                'game_date' => Carbon::parse('July 18, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'FAK')->first()->id,
                'away_id' => Team::where('abbreviation', 'TTB')->first()->id,
                'game_date' => Carbon::parse('July 18, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'TTB')->first()->id,
                'away_id' => Team::where('abbreviation', 'FAK')->first()->id,
                'game_date' => Carbon::parse('July 18, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Feura Bush')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'TBS')->first()->id,
                'away_id' => Team::where('abbreviation', 'BRJ')->first()->id,
                'game_date' => Carbon::parse('July 18, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'BRJ')->first()->id,
                'away_id' => Team::where('abbreviation', 'CAK')->first()->id,
                'game_date' => Carbon::parse('July 18, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'H4I')->first()->id,
                'away_id' => Team::where('abbreviation', 'PUB')->first()->id,
                'game_date' => Carbon::parse('July 18, 2021 4:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'BCS')->first()->id,
                'away_id' => Team::where('abbreviation', 'MIS')->first()->id,
                'game_date' => Carbon::parse('July 18, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Firemans')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'BCS')->first()->id,
                'away_id' => Team::where('abbreviation', 'HIT')->first()->id,
                'game_date' => Carbon::parse('July 18, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Firemans')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'FVS')->first()->id,
                'away_id' => Team::where('abbreviation', 'HIT')->first()->id,
                'game_date' => Carbon::parse('July 18, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Firemans')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', '518')->first()->id,
                'away_id' => Team::where('abbreviation', 'FAK')->first()->id,
                'game_date' => Carbon::parse('July 25, 2021 12:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'TKS')->first()->id,
                'away_id' => Team::where('abbreviation', 'H4I')->first()->id,
                'game_date' => Carbon::parse('July 25, 2021 1:30:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'home_id' => Team::where('abbreviation', 'TKS')->first()->id,
                'away_id' => Team::where('abbreviation', 'GIA')->first()->id,
                'game_date' => Carbon::parse('July 25, 2021 3:00:00 PM')->format('Y-m-d H:i:s'),
                'field_id' => Field::where('name', 'Mullens Park')->first()->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]
        ]
        );
    }
}
