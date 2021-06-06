<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;

use App\Models\Schedule;

class StandingController extends Controller
{
    public function standing(Request $request)
    {
        $validated = $request->validate([
            'division' => 'required|exists:divisions,id'
        ]);

        $list_of_games = Schedule::whereHas('home_team', function ($query) use ($request) {
            $query->where('division_id', $request->division);
        })
        ->where('completed', 1)
        ->get();

        $team = [];
        foreach ($list_of_games as $game) {
            $won = $lost = null;
            if ($game->home_score > $game->away_score) {
                $won = $game->home_id;
                $lost = $game->away_id;
            } elseif ($game->away_score > $game->home_score) {
                $won = $game->away_id;
                $lost = $game->home_id;
            } else {
                // tie
                continue;
            }

            // set winning team
            $total_win = Arr::get($team, $won.'.won', 0);
            $total_lost = Arr::get($team, $won.'.lost', 0);

            Arr::set($team, $won, [
                'won' => $total_win+1,
                'lost' => $total_lost,
                'team' => $game->home_team,
            ]);

            // set losing team
            $total_win = Arr::get($team, $lost.'.won', 0);
            $total_lost = Arr::get($team, $lost.'.lost', 0);

            Arr::set($team, $won, [
                'won' => $total_win,
                'lost' => $total_lost+1,
                'team' => $game->away_team,
            ]);
        }

        return array_values($team);
    }
}
