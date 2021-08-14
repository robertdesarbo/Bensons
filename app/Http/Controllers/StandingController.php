<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;

use App\Models\Team;
use App\Models\Schedule;

class StandingController extends Controller
{
    public function standing(Request $request)
    {
        $validated = $request->validate([
            'season' => 'required|exists:seasons,id'
        ]);

        $division_stats = [];
        Team::whereHas('season', function ($query) use ($request) {
            $query->where('seasons.id', $request->season)
            ->where('seasons.active', true)
            ->where('seasons.complete', false);
        })->chunk(50, function ($teams) use (&$division_stats) {
            foreach ($teams as $team) {
                $games = Schedule::has('home_team.division.league')
                ->has('away_team.division.league')
                ->where(function ($query) use ($team) {
                    $query->where('home_id', $team->id)->orWhere('away_id', $team->id);
                })
                ->where('completed', 1)
                ->get();

                $game_stats = [ 'won' => 0, 'lost' => 0 ];
                foreach ($games as $game) {
                    if ($game->home_team->id === $team->id) {
                        if ($game->home_score > $game->away_score) {
                            $game_stats[ 'won' ]++;
                        } else {
                            $game_stats[ 'lost' ]++;
                        }
                    } else {
                        if ($game->away_score > $game->home_score) {
                            $game_stats[ 'won' ]++;
                        } else {
                            $game_stats[ 'lost' ]++;
                        }
                    }
                }

                array_push($division_stats, [
                    'won' => $game_stats['won'],
                    'lost' => $game_stats['lost'],
                    'team' => $team,
                ]);
            }
        });

        return $division_stats;
    }
}
