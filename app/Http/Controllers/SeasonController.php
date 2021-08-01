<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Season;

class SeasonController extends Controller
{
    public function season_by_division(Request $request)
    {
        return Season::with('division')->where('division_id', $request->division)->get();
    }
}
