<?php

namespace Database\Factories;

use App\Models\Field;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class FieldFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Field::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $fieldLocationIDs = DB::table('field_locations')->pluck('id');

        return [
            'field_location_id' => $this->faker->randomElement($fieldLocationIDs),
            'name' => "Field ".$this->faker->numberBetween(1, 5),
            'alcohol' => $this->faker->boolean(),
            'private_property' => $this->faker->boolean(),
            'pets' => $this->faker->boolean(),
            'smoking' => $this->faker->boolean(),
            'ground_rules' => $this->faker->boolean() ?  $this->faker->text : null,
            'sport' => $this->faker->boolean() ? 'basketball' : 'softball',
            'lights' => $this->faker->boolean(),
            'active' => $this->faker->boolean(),
        ];
    }
}
