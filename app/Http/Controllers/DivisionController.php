<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Division;

class DivisionController extends Controller
{
    public function division(Request $request)
    {
        if ($request->division) {
            return Division::with('league')->has('league')->where('id', $request->division)->first();
        } else {
            return Division::with('league')->has('league')->get();
        }
    }

    public function divisionsActiveSeasons(Request $request)
    {
        return Division::with('league')
                ->has('league')
                ->whereHas('season', function ($query) {
                    $query->active();
                })->get();
    }

    public function addDivision(Request $request)
    {
        $validated = $request->validate([
            'league' => 'required|exists:leagues,id',
            'name' => 'required'
        ]);

        $division = Division::create([
            'league_id' => $request->league,
            'name' => $request->name
        ]);

        return $division->id;
    }

    public function editDivision(Request $request)
    {
        $validated = $request->validate([
            'division' => 'required|exists:divisions,id',
            'name' => 'required'
        ]);

        $division = Division::where('id', $request->division)->first();

        $division->update([
            'name' => $request->name
        ]);

        return $division->id;
    }

    public function removeDivision(Request $request)
    {
        $validated = $request->validate([
            'division' => 'required|exists:divisions,id'
        ]);

        Division::where('id', $request->division)->delete();
    }

    public function divisionByLeague(Request $request)
    {
        return Division::with('league')->has('league')->where('league_id', $request->league)->get();
    }
}
