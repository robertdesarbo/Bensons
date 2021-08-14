<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Season;

class SeasonController extends Controller
{
    public function activeSeasons(Request $request)
    {
        return Season::with('division.league')
        ->has('division.league')
        ->active()
        ->get();
    }

    public function activeSeasonsByDivisionId(Request $request)
    {
        $validated = $request->validate([
            'division' => 'required|exists:divisions,id',
        ]);

        return Season::with('division.league')
            ->has('division.league')
            ->active()
            ->where('division_id', $request->division)
            ->get();
    }

    public function seasons_by_division(Request $request)
    {
        return Season::with('division')->has('division')->where('division_id', $request->division)->get();
    }

    public function addSeason(Request $request)
    {
        $validated = $request->validate([
            'division' => 'required|exists:divisions,id',
            'active' => 'required|boolean',
            'complete' => 'required|boolean',
            'start_at' => 'required',
            'number_of_games' => 'required',
            'league_fee' => 'required',
            'offical_fee_per_game' => 'required'
        ]);

        $season = Season::create([
            'division_id' => $request->division,
            'active' => $request->active,
            'complete' => $request->complete,
            'start_at' => $request->start_at,
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
            'active' => 'required|boolean',
            'complete' => 'required|boolean',
            'start_at' => 'required',
            'number_of_games' => 'required',
            'league_fee' => 'required',
            'offical_fee_per_game' => 'required'
        ]);

        $season = Season::where('id', $request->season)->first();

        $season->update([
            'active' => $request->active,
            'complete' => $request->complete,
            'start_at' => $request->start_at,
            'number_of_games' => $request->number_of_games,
            'league_fee' => $request->league_fee,
            'offical_fee_per_game' => $request->offical_fee_per_game
        ]);

        return $season->id;
    }

    public function removeSeason(Request $request)
    {
        $validated = $request->validate([
            'season' => 'required|exists:seasons,id'
        ]);

        Season::where('id', $request->season)->delete();
    }
}
