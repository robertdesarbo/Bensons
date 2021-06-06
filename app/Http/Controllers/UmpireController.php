<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Umpire;

class UmpireController extends Controller
{
    public function umpire(Request $request)
    {
        return Umpire::all();
    }
}
