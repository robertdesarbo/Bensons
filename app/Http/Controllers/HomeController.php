<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Division;
use App\Models\Season;
use App\Models\Team;
use App\Models\FieldLocation;

class HomeController extends Controller
{
    public function stats(Request $request)
    {
        $divisions = Division::count();
        $teams = Season::withCount('teams')->active()->get()->sum(function ($region) {
            return $region->teams_count;
        });
        $fields = FieldLocation::count();

        return ['divisions' => $divisions, 'teams' => $teams, 'fields' => $fields];
    }
}
