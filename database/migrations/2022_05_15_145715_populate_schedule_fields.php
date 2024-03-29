<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PopulateScheduleFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //Get All Fields
        $fields = DB::table('fields')->get();

        DB::table('schedules')->orderBy('id')->chunk(200, function ($games) use($fields) {
            foreach ($games as $game) {
                $field_number = 1;
                if($game->field_number) {
                    $field_number = $game->field_number;
                }

                $field = $fields->where('field_location_id', $game->field_location_id)->where('number', $field_number)->first();

                if($field) {
                    DB::table('schedules')
                        ->where('id', $game->id)
                        ->update(['field_id' => $field->id]);
                } else {
                    // did not find field
                }
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('schedules')->update(['field_id' => null]);
    }
}
