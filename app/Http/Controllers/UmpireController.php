<?php

namespace App\Http\Controllers;

use App\Models\Umpire;
use Illuminate\Http\Request;

class UmpireController extends Controller
{
    public function umpire(Request $request)
    {
        return Umpire::all();
    }
}
