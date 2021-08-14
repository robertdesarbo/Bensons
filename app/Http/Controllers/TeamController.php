<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\Schedule;

use Illuminate\Support\Facades\Validator;

class TeamController extends Controller
{
    public function teams_by_season(Request $request)
    {
        return Team::whereHas('season', function ($query) use ($request) {
            $query->where('seasons.id', $request->season);
        })->get();
    }

    public function team(Request $request)
    {
        if ($request->team) {
            return Team::with('division.league')->has('division.league')->where('id', $request->team)->first();
        } else {
            return Team::with('division.league')->has('division.league')->get();
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

        $team = Team::where('id', $request->team)->first();

        // Division change -- check to make sure they dont have any unplayed games
        if ($team->division_id != $request->division) {
            $unplayed_games = Schedule::where(function ($q) use ($team) {
                $q->where('home_id', $team->id)->orWhere('away_id', $team->id);
            })->active()->count();

            if ($unplayed_games > 0) {
                //can not delete -- remove unplayed games
                $validator = Validator::make($request->all(), [
                    'team' => [
                        function ($attribute, $value, $fail) use ($unplayed_games, $team) {
                            $fail('You need to cancel the remaining '.$unplayed_games.' game(s) for '.$team->name.' before changing division');
                        },
                    ],
                    ])->validate();
            }
        }

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
