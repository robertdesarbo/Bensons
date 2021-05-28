<?php

namespace Database\Seeders;

use Carbon\Carbon;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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
        DB::table('fields')->insert([
            [
                'name' => "Albany JCC",
                'address' => "340 Whitehall Road",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12208,
                'alcohol' => true,
                'private_property' => true,
                'pets' => false,
                'smoking' => true,
                'ground_rules' => 'Out of bounds - from the backstop straight out. Also, LF on field two - over the fence is a HR, everything else – run it out',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Arbor Hill",
                'address' => "6 Lark Street",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12210,
                'alcohol' => true,
                'private_property' => false,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Bleecker Stadium	",
                'address' => "Clinton Avenue & Manning Blvd.",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12206,
                'alcohol' => true,
                'private_property' => false,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => 'Anything over the fences is an HR, if it goes under the fence – ground rule 2B. If ball rolls into hole in CF – umpire discretion(2 base award from when it rolled into deadball area). Ex – if runner was past 2B, then it’s a HR.',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Cohoes Intermediate",
                'address' => "1 Adams Avenue",
                'city' => "Cohoes",
                'state' => "New York",
                'zip' => 12047,
                'alcohol' => true,
                'private_property' => false,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Corrections Academy",
                'address' => "1134 New Scotland Road",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12208,
                'alcohol' => false,
                'private_property' => true,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => 'Anything hit onto the tennis court in the air is HR, if it rolls onto the court – ground rule 2B. Out of bounds straight line out from fences.',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Coyne Field",
                'address' => "23 Rensselaer Avenue",
                'city' => "Rensselaer",
                'state' => "New York",
                'zip' => 12144,
                'alcohol' => true,
                'private_property' => true,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => 'Everything is fenced in – BUT bench in LF is ground rule 2B cause of safety, and CF/RF If it gets under the brush, ground rule 2B. **CLEAN UP DUGOUTS AFTER EVERY GAME – ALSO – DO NOT! DO NOT! DO NOT GO onto the field if the girls are still there!!',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Feura Bush",
                'address' => "64 Mathias Place",
                'city' => "Feura Bush",
                'state' => "New York",
                'zip' => 12067,
                'alcohol' => true,
                'private_property' => false,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => 'Everything inside the fences is in play',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Firemans",
                'address' => "20 Moore Street",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12202,
                'alcohol' => true,
                'private_property' => false,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Fred Abele / McKownville Park",
                'address' => "Strawberry Lane",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12203,
                'alcohol' => true,
                'private_property' => true,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Green Tech",
                'address' => "99 Slingerlands Street",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12202,
                'alcohol' => true,
                'private_property' => true,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Henry Hudson Town Park",
                'address' => "Barent Winne Road",
                'city' => "Selkirk",
                'state' => "New York",
                'zip' => 12158,
                'alcohol' => true,
                'private_property' => false,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Knickerbacker Park",
                'address' => "106th Street & Knickerbacker Lane",
                'city' => "Troy",
                'state' => "New York",
                'zip' => 12182,
                'alcohol' => true,
                'private_property' => false,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => 'All fields are fully fenced in. Any ball that goes through any opening in the fencing is a dead ball. Any fair batted ball that goes thru an opening or bounces over the outfield fence is a ground rule 2B. Nightly closing duties ... If your game is the last to end on a given night, it is the responsibility of the HOME team to close up the park for the night. If your game ends and a game on one of the other fields is still being played, then you do not have to do anything. You must close and lock the 2 bathroom doors. You must then turn off the lights and close and lock the utility room door. Relative to the utility room door, the light panel is located in a grey box on the middle of the wall to your left. Turn the pairs of switches off (squeeze each pair towards middle for OFF) from top to bottom ... 1st 3 pairs are K1 / next 3 pairs are K2 / next 3 pairs are K3 / remaining are bathroom and utility room lights. Go outside and make sure all lights are off before you close and lock the door.',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Legion Field",
                'address' => "200 McCarty Avenue",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12209,
                'alcohol' => true,
                'private_property' => true,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Mullens Park",
                'address' => "35 North First Street",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12204,
                'alcohol' => true,
                'private_property' => true,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => 'Over the fence is HR, everything inside the fence is in play except - small section on 3rd base side between the backstop & dugout(line usually drawn) Out of Bounds - Also, trees hanging over the 3rd base dugout is out of play.',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "North Greenbush Town Park",
                'address' => "91 Williams Road",
                'city' => "Troy",
                'state' => "New York",
                'zip' => 12180,
                'alcohol' => true,
                'private_property' => false,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Nott Road Town Park",
                'address' => "6073 Nott Road",
                'city' => "Guilderland",
                'state' => "New York",
                'zip' => 12084,
                'alcohol' => true,
                'private_property' => false,
                'pets' => true,
                'smoking' => false,
                'ground_rules' => 'Out of Bounds - there should be a dotted line going straight out from the backstops out,everything inside those lines are in play. ON FIELD #1 you can catch up to the LIGHT POLES. ON FIELD #2 – WOODS rule => in the AIR = HR, bouncing in = 2B. Umpire discretion on that call',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Ridgefield Park",
                'address' => "316 Partridge Street",
                'city' => "Troy",
                'state' => "New York",
                'zip' => 12208,
                'alcohol' => true,
                'private_property' => false,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => 'The SB = softball, the side next to the tennis courts(Partridge St.), if ball goes over fences on either side, but are fair = HR. If bounce over/under but fair = 2B. It hits pole in FAIR territory down LF line = 2B(even if high up). The BB = baseball, the side nearer the playground(Ridgefield St). Out of bounds fence straight out on both sides. IF it ever goes over tennis court fence = HR(that would be a shot). Same in RF – over fence = HR. If ball goes through openings in fences = deadball.',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Shaker FD",
                'address' => "144 Old Niskayuna Road",
                'city' => "Albany",
                'state' => "New York",
                'zip' => 12211,
                'alcohol' => true,
                'private_property' => false,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => 'Everything inside the fences is in play. IF fence left open – deadball if it goes out of play.',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "South Bethlehem Park",
                'address' => "20 Wylie Avenue",
                'city' => "Bethlehem",
                'state' => "New York",
                'zip' => 12161,
                'alcohol' => true,
                'private_property' => false,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'name' => "Swift Road Town Park",
                'address' => "148 Swift Road",
                'city' => "Voorheesville",
                'state' => "New York",
                'zip' => 12186,
                'alcohol' => true,
                'private_property' => false,
                'pets' => true,
                'smoking' => true,
                'ground_rules' => null,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]
        ]);
    }
}
