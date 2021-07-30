<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AngularController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('download/{rule}', function ($rule) {
    if ($rule == "Benson_Sunday") {
        $file_name = "Empire-State-Sports-Sunday-League-Rules-2021.pdf";
    } elseif ($rule == "Lynn_COED") {
        $file_name = "Rules-LYN-Coed-2021.pdf";
    } else {
        $file_name = "Rules-LYN-Mens-2021.pdf";
    }

    return response()->download("build/assets/content/".$file_name);
});


Route::any('/{any}', [AngularController::class, 'index'])->where('any', '^(?!api).*$');
