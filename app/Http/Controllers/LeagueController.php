<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\League;

class LeagueController extends Controller
{
    public function league(Request $request)
    {
        return League::all();
    }

    public function addLeague(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'sport' => 'required'
        ]);

        $league = League::create([
            'name' => $request->name,
            'sport' => $request->sport
        ]);

        return $league->id;
    }

    public function editLeague(Request $request)
    {
        $validated = $request->validate([
            'league' => 'required|exists:leagues,id',
            'name' => 'required',
            'sport' => 'required'
        ]);

        $league = League::where('id', $request->league)->first();

        $league->update([
                'name' => $request->name,
                'sport' => $request->sport
            ]);

        return $league->id;
    }
}
