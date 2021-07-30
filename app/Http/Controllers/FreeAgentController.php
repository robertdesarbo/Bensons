<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\FreeAgent;
use App\Models\TeamFreeAgent;

class FreeAgentController extends Controller
{
    public function freeAgent(Request $request)
    {
        return FreeAgent::with('division')->get();
    }

    public function findTeam(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'division' => 'required|exists:divisions,id'
        ]);

        $schedule = FreeAgent::updateOrCreate(
            [
                'email' => $request->email,
            ],
            [
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'division_id' => $request->division
            ]
        );
    }

    public function findPlayers(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'positions' => 'required',
            'genders' => 'required',
            // 'team' => 'required|exists:teams,id'
        ]);

        $schedule = TeamFreeAgent::updateOrCreate(
            [
                'email' => $request->email,
            ],
            [
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'positions' => json_encode($request->positions),
                'genders' => json_encode($request->genders),
                // 'team_id' => $request->team
            ]
        );
    }
}
