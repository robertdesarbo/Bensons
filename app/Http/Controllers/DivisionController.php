<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Division;

class DivisionController extends Controller
{
    public function division(Request $request)
    {
        if ($request->division) {
            return Division::with('league')->where('league_id', $request->division)->get();
        } else {
            return Division::with('league')->get();
        }
    }
}
