<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\RegisterTeam;

class RegisteredTeamController extends Controller
{
    public function registeredTeam(Request $request)
    {
        return RegisterTeam::all();
    }
}
