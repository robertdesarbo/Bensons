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
            'division' => 'required|exists:divisions,id'
        ]);

        $division_stats = [];
        Team::where('division_id', $request->division)->chunk(50, function ($teams) use (&$division_stats) {
            foreach ($teams as $team) {
                $games = Schedule::orWhere(function ($query) use ($team) {
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
