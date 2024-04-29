<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class FieldFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $fieldLocationIDs = DB::table('field_locations')->pluck('id');

        return [
            'field_location_id' => $this->faker->randomElement($fieldLocationIDs),
            'name' => 'Field '.$this->faker->numberBetween(1, 5),
            'alcohol' => $this->faker->boolean(),
            'private_property' => $this->faker->boolean(),
            'pets' => $this->faker->boolean(),
            'smoking' => $this->faker->boolean(),
            'ground_rules' => $this->faker->boolean() ? $this->faker->text() : null,
            'sport' => $this->faker->boolean() ? 'basketball' : 'softball',
            'lights' => $this->faker->boolean(),
            'active' => $this->faker->boolean(),
        ];
    }
}
