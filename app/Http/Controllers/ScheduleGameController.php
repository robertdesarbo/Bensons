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
    public function schedule(Request $request)
    {
        return Schedule::with('home_team', 'away_team', 'field', 'umpires', 'home_team.division', 'away_team.division')
        ->orderBy('game_date', 'ASC')
        ->get();
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

    public function getScheduledGame(Request $request)
    {
        $validated = $request->validate([
            'schedule' => 'required|exists:schedules,id'
        ]);

        $schedule = Schedule::with('home_team.division', 'away_team', 'umpires')->where('id', $request->schedule)->first();

        return $schedule;
    }



    public function scheduleGame(Request $request)
    {
        $validated = $request->validate([
            'homeTeam' => 'required|exists:teams,id',
            'awayTeam' => 'required|exists:teams,id',
            'date' => 'required',
            'field' => 'required|exists:fields,id',
            'umpire' => 'nullable|exists:umpires,id',
            'homeScore' => 'nullable|integer',
            'awayScore' => 'nullable|integer',
        ]);


        $schedule = Schedule::create([
            'home_id' => $request->homeTeam,
            'away_id' => $request->awayTeam,
            'game_date' => Carbon::parse($request->date),
            'field_id' => $request->field,
            'home_score' => $request->homeScore,
            'away_score' => $request->awayScore,
        ]);

        if (!empty($request->umpire)) {
            $schedule->umpires()->attach($request->umpire);
        }
    }

    public function updateGame(Request $request)
    {
        $validated = $request->validate([
            'schedule' => 'required|exists:schedules,id',
            'homeTeam' => 'required|exists:teams,id',
            'awayTeam' => 'required|exists:teams,id',
            'date' => 'required',
            'field' => 'required|exists:fields,id',
            'umpire' => 'nullable|exists:umpires,id',
            'homeScore' => 'nullable|integer',
            'awayScore' => 'nullable|integer',
        ]);


        $schedule = Schedule::where('id', $request->schedule);

        $schedule->update([
            'home_id' => $request->homeTeam,
            'away_id' => $request->awayTeam,
            'game_date' => Carbon::parse($request->date),
            'field_id' => $request->field,
            'home_score' => $request->homeScore,
            'away_score' => $request->awayScore,
        ]);

        if (!empty($request->umpire)) {
            $schedule->first()->umpires()->sync([$request->umpire]);
        }
    }

    public function removeGame(Request $request)
    {
        $validated = $request->validate([
            'schedule' => 'required|exists:schedules,id'
        ]);

        Schedule::where('id', $request->schedule)->delete();
    }
}
