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
        //Game with Active Season
        return Schedule::with('home_team', 'away_team', 'field', 'umpires', 'home_team.division', 'away_team.division')
        ->whereHas('season', function ($query) {
            $query->active();
        })
        ->has('home_team.division.league')
        ->has('away_team.division.league')
        ->orderBy('game_date', 'ASC')
        ->get();
    }

    public function scheduleForm(Request $request)
    {
        $validated = $request->validate([
            'season' => 'required|exists:seasons,id'
        ]);

        $teams = Team::whereHas('seasons', function ($query) use ($request) {
            $query->where('seasons.id', $request->season);
        })->get();

        $fields = Field::all();
        $umpires = Umpire::all();

        return ['teams' => $teams, 'fields' => $fields, 'umpires' => $umpires];
    }

    public function getScheduledGame(Request $request)
    {
        $validated = $request->validate([
            'schedule' => 'required|exists:schedules,id'
        ]);

        $schedule = Schedule::with('home_team.division', 'away_team', 'umpires')
        ->has('home_team.division')
        ->where('id', $request->schedule)->first();

        return $schedule;
    }

    public function scheduleGame(Request $request)
    {
        $validated = $request->validate([
            'season' => 'required|exists:seasons,id',
            'homeTeam' => 'required|exists:teams,id',
            'awayTeam' => 'required|exists:teams,id',
            'date' => 'required',
            'field' => 'required|exists:fields,id',
            'field_number' => 'nullable|integer',
            'umpire' => 'nullable|exists:umpires,id',
            'homeScore' => 'nullable|integer',
            'awayScore' => 'nullable|integer',
            'outcome' => 'nullable|in:delayed,completed,rescheduled,canceled',
            'notes' => 'nullable|string',
        ]);


        $schedule = Schedule::create([
            'season_id' => $request->season,
            'home_id' => $request->homeTeam,
            'away_id' => $request->awayTeam,
            'game_date' => Carbon::parse($request->date),
            'field_id' => $request->field,
            'field_number' => $request->field_number,
            'home_score' => $request->homeScore,
            'away_score' => $request->awayScore,
            'delayed' => ($request->outcome === 'delayed'),
            'completed' => ($request->outcome === 'completed'),
            'rescheduled' => ($request->outcome === 'rescheduled'),
            'canceled' => ($request->outcome === 'canceled'),
            'notes' => $request->notes,
        ]);

        if (!empty($request->umpire)) {
            $schedule->umpires()->attach($request->umpire);
        }
    }

    public function updateGame(Request $request)
    {
        $validated = $request->validate([
            'schedule' => 'required|exists:schedules,id',
            'season' => 'required|exists:seasons,id',
            'homeTeam' => 'required|exists:teams,id',
            'awayTeam' => 'required|exists:teams,id',
            'date' => 'required',
            'field' => 'required|exists:fields,id',
            'field_number' => 'nullable|integer',
            'umpire' => 'nullable|exists:umpires,id',
            'homeScore' => 'nullable|integer',
            'awayScore' => 'nullable|integer',
            'outcome' => 'nullable|in:delayed,completed,rescheduled,canceled',
            'notes' => 'nullable|string',
        ]);


        $schedule = Schedule::where('id', $request->schedule);

        $schedule->update([
            'season_id' => $request->season,
            'home_id' => $request->homeTeam,
            'away_id' => $request->awayTeam,
            'game_date' => Carbon::parse($request->date),
            'field_id' => $request->field,
            'field_number' => $request->field_number,
            'home_score' => $request->homeScore,
            'away_score' => $request->awayScore,
            'delayed' => ($request->outcome === 'delayed'),
            'completed' => ($request->outcome === 'completed'),
            'rescheduled' => ($request->outcome === 'rescheduled'),
            'canceled' => ($request->outcome === 'canceled'),
            'notes' => $request->notes,
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
