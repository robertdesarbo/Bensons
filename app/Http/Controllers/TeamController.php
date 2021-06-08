<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Team;

class TeamController extends Controller
{
    public function team(Request $request)
    {
        if ($request->team) {
            return Team::with('division.league')->where('id', $request->team)->first();
        } else {
            return Team::with('division.league')->get();
        }
    }

    public function addTeam(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'abbreviation' => 'required',
            'league' => 'required|exists:leagues,id',
            'division' => 'required|exists:divisions,id'
        ]);


        $team = Team::create([
            'name' => $request->name,
            'abbreviation' => $request->abbreviation,
            'division_id' => $request->division
        ]);
    }

    public function editTeam(Request $request)
    {
        $validated = $request->validate([
            'team' => 'required|exists:teams,id',
            'name' => 'required',
            'abbreviation' => 'required',
            'league' => 'required|exists:leagues,id',
            'division' => 'required|exists:divisions,id'
        ]);

        $team = Team::where('id', $request->team);

        $team->update([
            'name' => $request->name,
            'abbreviation' => $request->abbreviation,
            'division_id' => $request->division
        ]);

        if (!empty($request->umpire)) {
            $team->first()->umpires()->sync([$request->umpire]);
        }
    }

    public function removeTeam(Request $request)
    {
        $validated = $request->validate([
            'team' => 'required|exists:teams,id'
        ]);

        $team = Team::findOrFail($request->team);

        $team->home()->delete();
        $team->away()->delete();
        $team->delete();
    }
}
