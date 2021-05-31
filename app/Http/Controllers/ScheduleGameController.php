<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Division;
use App\Models\Team;
use App\Models\Field;
use App\Models\Umpire;
use App\Models\Schedule;

use Illuminate\Support\Facades\Auth;

class ScheduleGameController extends Controller
{

    public function getDivisions(Request $request)
    {
        $divisions = Division::all();

        return $divisions;
    }

    public function scheduleForm(Request $request)
    {
        $validated = $request->validate([
            'division' => 'required|exists:divisions,id'
        ]);

        $teams = Team::where('division_id', $request->division)->get();
        $fields = Field::all();
        $umpires = Umpire::all();

        return ['teams' => $teams, 'fields' => $fields, 'umpires' => $umpires];
    }

    public function scheduleGame(Request $request)
    {
        $validated = $request->validate([
            'homeTeam' => 'required|exists:teams,id',
            'awayTeam' => 'required|exists:teams,id',
            'date' => 'required',
            'field' => 'required|exists:fields,id',
            'umpire' => 'nullable|exists:umpires,id',
        ]);


        $schedule = Schedule::create([
            'home_id' => $request->homeTeam,
            'away_id' => $request->awayTeam,
            'game_date' => Carbon::parse($request->date),
            'field_id' => $request->field,
        ]);

        if(!empty($request->umpire)) {
            $schedule->umpires()->attach($request->umpire);
        }
    }
}
