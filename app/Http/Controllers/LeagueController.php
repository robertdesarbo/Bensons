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
}
