<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\FreeAgent;

class FreeAgentController extends Controller
{
    public function freeAgent(Request $request)
    {
        return FreeAgent::with('division')->get();
    }
}
