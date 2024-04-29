<?php

namespace Database\Factories;

use App\Models\Division;
use App\Models\Team;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TeamFactory extends Factory
{
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
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),

        ];
    }
}
