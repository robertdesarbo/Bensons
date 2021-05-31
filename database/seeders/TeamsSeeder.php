<?php

namespace Database\Seeders;

use Carbon\Carbon;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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

        $division_cd = Division::where('name', 'C\D')->first()->id;
        DB::table('teams')->insert( [
            [
                'name' => 'Grapeville Insurance',
                'abbreviation' => 'GIA',
                'division_id' => $division_cd,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => 'Cake Eaters',
                'abbreviation' => 'CAK',
                'division_id' => $division_cd,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => 'Habitat 4 Instanity',
                'abbreviation' => 'H4I',
                'division_id' => $division_cd,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => 'Heavy Hitters',
                'abbreviation' => 'HHS',
                'division_id' => $division_cd,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => 'The Big Sticks',
                'abbreviation' => 'TBS',
                'division_id' => $division_cd,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => 'Takeover Sun',
                'abbreviation' => 'TKS',
                'division_id' => $division_cd,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => 'The Pubbers',
                'abbreviation' => 'PUB',
                'division_id' => $division_cd,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => 'Brew Jays',
                'abbreviation' => 'BRJ',
                'division_id' => $division_cd,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]
            ] );


            $division_e = Division::where('name', 'E')->first()->id;
            DB::table('teams')->insert([
                [
                    'name' => 'Fake Blunters',
                    'abbreviation' => 'FAK',
                    'division_id' => $division_e,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    'name' => 'I\'d Hit It',
                    'abbreviation' => 'HIT',
                    'division_id' => $division_e,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    'name' => '518 Ballers',
                    'abbreviation' => '518',
                    'division_id' => $division_e,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    'name' => 'Misfits',
                    'abbreviation' => 'MIS',
                    'division_id' => $division_e,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    'name' => 'Turntable Brewing',
                    'abbreviation' => 'TTB',
                    'division_id' => $division_e,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    'name' => 'Five Star',
                    'abbreviation' => 'FVS',
                    'division_id' => $division_e,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    'name' => 'Backdoor Sliders',
                    'abbreviation' => 'BCS',
                    'division_id' => $division_e,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                ] );
            }
        }
