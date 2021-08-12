<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Season;

class SeasonController extends Controller
{
    public function season_by_division(Request $request)
    {
        return Season::with('division')->where('division_id', $request->division)->get();
    }

    public function addSeason(Request $request)
    {
        $validated = $request->validate([
            'division' => 'required|exists:divisions,id',
            'start_at' => 'required',
            'active' => 'required',
            'number_of_games' => 'required',
            'league_fee' => 'required',
            'offical_fee_per_game' => 'required'
        ]);

        $season = Season::create([
            'division_id' => $request->division,
            'start_at' => $request->start_at,
            'active' => $request->active,
            'number_of_games' => $request->number_of_games,
            'league_fee' => $request->league_fee,
            'offical_fee_per_game' => $request->offical_fee_per_game
        ]);

        return $season->id;
    }

    public function editSeason(Request $request)
    {
        $validated = $request->validate([
            'season' => 'required|exists:seasons,id',
            'start_at' => 'required',
            'active' => 'required',
            'number_of_games' => 'required',
            'league_fee' => 'required',
            'offical_fee_per_game' => 'required'
        ]);

        $season = Season::where('id', $request->season)->first();

        $season->update([
            'start_at' => $request->start_at,
            'active' => $request->active,
            'number_of_games' => $request->number_of_games,
            'league_fee' => $request->league_fee,
            'offical_fee_per_game' => $request->offical_fee_per_game
        ]);

        return $season->id;
    }
}
