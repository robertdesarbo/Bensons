<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;

use App\Models\Division;
use App\Models\Team;
use App\Models\Field;

class HomeController extends Controller
{
    public function stats(Request $request)
    {
        $divisions = Division::count();
        $teams = Team::count();
        $fields = Field::count();

        return ['divisions' => $divisions, 'teams' => $teams, 'fields' => $fields];
    }
}
