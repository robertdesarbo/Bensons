<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Division;

class DivisionController extends Controller
{
    public function division(Request $request)
    {
        if ($request->divisionId) {
            return Division::with('league')->where('id', $request->divisionId)->get();
        } else {
            return Division::with('league')->get();
        }
    }
}
