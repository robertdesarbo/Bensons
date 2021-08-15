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
        return FreeAgent::with('division')->has('division')->get();
    }

    public function teamFreeAgent(Request $request)
    {
        return TeamFreeAgent::get();
    }

    public function findTeam(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'division' => 'required|exists:divisions,id',
            'gender' => 'required',
        ]);

        $free_agent = FreeAgent::updateOrCreate(
            [
                'email' => $request->email,
            ],
            [
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'gender' => $request->gender
            ]
        );

        if (!empty($request->division)) {
            $free_agent->divisions()->detach();
            $free_agent->divisions()->attach($request->division);
        }
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

        $free_agent = TeamFreeAgent::updateOrCreate(
            [
                'email' => $request->email,
            ],
            [
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'positions' => $request->positions,
                'genders' => $request->genders,
                // 'team_id' => $request->team
            ]
        );
    }
}
