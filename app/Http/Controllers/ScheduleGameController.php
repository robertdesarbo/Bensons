<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\Field;
use App\Models\Umpire;

use Illuminate\Support\Facades\Auth;

class ScheduleGameController extends Controller
{
    public function scheduleForm(Request $request)
    {
        $teams = Team::all();
        $fields = Field::all();
        $umpires = Umpire::all();

        return ['teams' => $teams, 'fields' => $fields, 'umpires' => $umpires];
    }

}
