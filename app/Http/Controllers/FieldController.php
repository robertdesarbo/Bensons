<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Field;

class FieldController extends Controller
{
    public function field(Request $request)
    {
        return Field::all();
    }
}
