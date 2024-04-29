<?php

namespace App\Http\Controllers;

use App\Models\RegisterTeam;
use Illuminate\Http\Request;

class RegisteredTeamController extends Controller
{
    public function registeredTeam(Request $request)
    {
        return RegisterTeam::all();
    }
}
