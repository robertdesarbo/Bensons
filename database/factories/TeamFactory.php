<?php

namespace Database\Factories;

use App\Models\Team;
use App\Models\Division;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

use Carbon\Carbon;

class TeamFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Team::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $division = Division::pluck('id')->toArray();

        return [
            'name' => $this->faker->company(),
            'abbreviation' => strtoupper(Str::random(3)),
            'division_id' => $this->faker->randomElement($division),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')

        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
