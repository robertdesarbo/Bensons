<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Field;

use Illuminate\Support\Facades\Auth;

class FieldController extends Controller
{
    public function field(Request $request)
    {
        return Field::all();
    }
}
