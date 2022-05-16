<?php

namespace Database\Seeders;

use Carbon\Carbon;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\Models\Field;

class FieldSeeder extends Seeder
{
    /**
    * Run the database seeds.
    *
    * @return void
    */
    public function run()
    {
        //
        DB::table('field_locations')->insert([
            [
                'name' => "Albany JCC",
                'address' => "340 Whitehall Road",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12208,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Arbor Hill",
                'address' => "6 Lark Street",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12210,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Bleecker Stadium	",
                'address' => "Clinton Avenue & Manning Blvd.",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12206,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Cohoes Intermediate",
                'address' => "1 Adams Avenue",
                'city' => "Cohoes",
                'state' => "New York",
                'zip' => 12047,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Corrections Academy",
                'address' => "1134 New Scotland Road",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12208,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Coyne Field",
                'address' => "23 Rensselaer Avenue",
                'city' => "Rensselaer",
                'state' => "New York",
                'zip' => 12144,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Feura Bush",
                'address' => "64 Mathias Place",
                'city' => "Feura Bush",
                'state' => "New York",
                'zip' => 12067,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Firemans",
                'address' => "20 Moore Street",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12202,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Fred Abele / McKownville Park",
                'address' => "Strawberry Lane",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12203,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Green Tech",
                'address' => "99 Slingerlands Street",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12202,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Henry Hudson Town Park",
                'address' => "Barent Winne Road",
                'city' => "Selkirk",
                'state' => "New York",
                'zip' => 12158,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Knickerbacker Park",
                'address' => "106th Street & Knickerbacker Lane",
                'city' => "Troy",
                'state' => "New York",
                'zip' => 12182,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Legion Field",
                'address' => "200 McCarty Avenue",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12209,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Mullens Park",
                'address' => "35 North First Street",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12204,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "North Greenbush Town Park",
                'address' => "91 Williams Road",
                'city' => "Troy",
                'state' => "New York",
                'zip' => 12180,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Nott Road Town Park",
                'address' => "6073 Nott Road",
                'city' => "Guilderland",
                'state' => "New York",
                'zip' => 12084,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Ridgefield Park",
                'address' => "316 Partridge Street",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12208,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Shaker FD",
                'address' => "144 Old Niskayuna Road",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12211,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "South Bethlehem Park",
                'address' => "20 Wylie Avenue",
                'city' => "Bethlehem",
                'state' => "New York",
                'zip' => 12161,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Swift Road Town Park",
                'address' => "148 Swift Road",
                'city' => "Voorheesville",
                'state' => "New York",
                'zip' => 12186,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]
        ]);

        Field::factory()->count(50)->create();
    }
}
