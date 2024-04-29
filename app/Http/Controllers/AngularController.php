<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class AngularController extends Controller
{
    public function index(): View
    {
        return view('angular');
    }
}
