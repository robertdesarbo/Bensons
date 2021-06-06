<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Team;

class TeamController extends Controller
{
    public function team(Request $request)
    {
        return Team::all();
    }
}
