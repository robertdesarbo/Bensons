<?php

namespace Database\Factories;

use App\Models\Division;
use App\Models\Field;
use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

class ScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $division = Division::pluck('id')->toArray();

        $team = Team::where('division_id', $this->faker->randomElement($division))->pluck('id')->toArray();
        $field = Field::pluck('id')->toArray();

        $completed = rand(0, 1) == 1;

        $home_score = $away_score = null;

        if ($completed) {
            $home_score = rand(0, 30);
            $away_score = rand(0, 30);
        }

        $dt = $this->faker->dateTimeBetween($startDate = '-6 months', $endDate = '6 months');
        $game_date = $dt->format('Y-m-d H:i:s');

        $field_id = $this->faker->randomElement($field);

        return [
            'home_id' => $this->faker->randomElement($team),
            'away_id' => $this->faker->randomElement($team),
            'game_date' => $game_date,
            'field_id' => $field_id,
            'home_score' => $home_score,
            'away_score' => $away_score,
            'completed' => $completed,
        ];
    }
}
