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

Route::get('download-sponsor/{sponsor}', function ($sponsor) {
    if ($sponsor == "Contemporary-Designs") {
        $file_name = "Contemporary-Designs-star.jpg";
    } elseif ($sponsor == "Gettysburg-Flag-Works") {
        $file_name = "Gettysburg-Flag-Works.png";
    } elseif ($sponsor == "Wyatts-Wicked-Goods") {
        $file_name = "Wyatts-Wicked-Goods.png";
    } elseif ($sponsor == "Spinners-Pizza") {
        $file_name = "Spinners-Pizza.jpeg";
    }

    return response()->file("build/assets/content/sponsors/".$file_name);
});

Route::get('download/{rule}', function ($rule) {
    if ($rule == "Benson_Sunday") {
        $file_name = "Empire-State-Sports-Sunday-League-Rules-2021.pdf";
    } elseif ($rule == "Lynn_COED") {
        $file_name = "Rules-LYN-Coed-2021.pdf";
    } elseif ($rule == "Basketball_Sponsor_Letter") {
        $file_name = "Sponsor-Letter-BESS-BBall-2021-22.doc";
    } elseif ($rule == "ASA_Not_Approved") {
        $file_name = "ASA-Non-Approved-BatList-1Page.pdf";
    } elseif ($rule == "Basketball_Info_Sheet") {
        $file_name = "Basketball-Information-Sheet-2021.jpg";
    } elseif ($rule == "Basketball_Sign_Up_Sheet") {
        $file_name = "Basketball-Sign-Up-Sheet-2021.jpg";
    } elseif ($rule == "Basketball_Rules") {
        $file_name = "Rules-Bensons-Basketball-2021.pdf";
    } elseif ($rule == "2022_BESS_Softball_Info_Sheet_And_Signup_Sheet") {
        $file_name = "2022/bensons-softball/2022-BESS-Softball-Info-Sheet-And-Signup-Sheet.pdf";
    } elseif ($rule == "2022_BESS_Softball_Sponsor_Letter") {
        $file_name = "2022/bensons-softball/2022-BESS-Softball-Sponsor-Letter.pdf";
    } elseif ($rule == "2022_Lynns_Softball_Info_Sheet_And_Signup_Sheet") {
        $file_name = "2022/lynns-softball/2022-Lynns-Softball-Info-Sheet-And-Signup-Sheet.pdf";
    } elseif ($rule == "2022_Lynns_Softball_Sponsor_Letter") {
        $file_name = "2022/lynns-softball/2022-Lynns-Softball-Sponsor-Letter.pdf";
    } else {
        $file_name = "Rules-LYN-Mens-2021.pdf";
    }

    return response()->download("build/assets/content/".$file_name);
});


Route::any('/{any}', [AngularController::class, 'index'])->where('any', '^(?!api).*$');
