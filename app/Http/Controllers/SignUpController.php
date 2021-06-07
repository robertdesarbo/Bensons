<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;

use App\Models\FreeAgent;
use App\Models\RegisterTeam;

class SignUpController extends Controller
{
    public function registerTeam(Request $request)
    {
        $validated = $request->validate([
            'teamName' => 'required',
            'captainName' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'division' => 'required|exists:divisions,id'
        ]);


        $schedule = RegisterTeam::create([
            'team_name' => $request->teamName,
            'captain_name' => $request->captainName,
            'phone' => $request->phone,
            'email' => $request->email,
            'division_id' => $request->division
        ]);
    }

    public function findTeam(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'division' => 'required|exists:divisions,id'
        ]);

        $schedule = FreeAgent::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'division_id' => $request->division
        ]);
    }
}
