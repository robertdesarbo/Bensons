<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Division;

class DivisionController extends Controller
{
    public function division(Request $request)
    {
        return Division::with('league')->get();
    }
}
