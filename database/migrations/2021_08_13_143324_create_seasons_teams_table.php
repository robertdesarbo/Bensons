<?php

use App\Models\Team;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('season_team', function (Blueprint $table) {
            $table->foreignId('season_id')->constrained('seasons');
            $table->foreignId('team_id')->constrained('teams');
            $table->primary(['season_id', 'team_id']);
            $table->timestamps();
        });

        $teams = Team::get();

        foreach ($teams as $team) {
            //first works here because there is only 1 season
            $team->seasons()->attach($team->division->season->first()->id);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('season_team');
    }
};
