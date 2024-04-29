<?php

use App\Models\Field;
use App\Models\FieldLocation;
use Illuminate\Database\Migrations\Migration;

class PopulateNewFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Get records from old column.
        $field_locations = DB::table('field_locations')->get();

        $basketball_courts = [
            'Albany Academy for Girls',
            'Washington Avenue Armory',
            'Sage of Albany Gym',
            'Albany Academy for Boys',
            'McBride Dags Sports Hall',
        ];

        $alphabet = range('A', 'Z');

        foreach ($field_locations as $field_location) {
            FieldLocation::where('id', $field_location->id)->update(['active' => true]);

            for ($x = 0; $x < $field_location->total_fields; $x++) {
                $name = 'Field '.$x + 1;
                if ($field_location->field_alpha_display) {
                    $name = 'Field '.$alphabet[$x];
                }

                Field::firstOrCreate([
                    'field_location_id' => $field_location->id,
                    'number' => $x + 1,
                    'name' => $name,
                    'alcohol' => $field_location->alcohol,
                    'private_property' => $field_location->private_property,
                    'pets' => $field_location->pets,
                    'smoking' => $field_location->smoking,
                    'ground_rules' => $field_location->ground_rules,
                    'sport' => in_array($field_location->name, $basketball_courts) ? 'basketball' : 'softball',
                    'lights' => true,
                    'active' => true,
                ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
