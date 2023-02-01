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

    if ($rule == "ASA_Not_Approved") {
        $file_name = "2022/2022-ASA-Non-Approved-BatList.pdf";
    } else if ($rule == "Ground_Rules") {
        $file_name = "2022/2022-Ground-Rules.pdf";
    } else if ($rule == "Roster_Sheet") {
        $file_name = "2022/2022-Roster-Sheet.xlsx";
    } else if ($rule == "Lineup_Card") {
        $file_name = "2022/2022-Blank-Lineup-Card.pdf";
    }  else if ($rule == "2022_BESS_Softball_COED_Rules") {
        $file_name = "2022/bensons-softball/2022-BESS-Softball-Coed-Rules.pdf";
    } elseif ($rule == "2022_BESS_Softball_Info_Sheet_And_Signup_Sheet") {
        $file_name = "2022/bensons-softball/2022-BESS-Softball-Info-Sheet-And-Signup-Sheet.pdf";
    } elseif ($rule == "2022_BESS_Softball_Sponsor_Letter") {
        $file_name = "2022/bensons-softball/2022-BESS-Softball-Sponsor-Letter.pdf";
    } else if ($rule == "2022_BESS_Softball_Friday_Night_Rules") {
        $file_name = "2022/bensons-softball/2022-Bess-Softball-Friday-Night-Rules.pdf";
    }  else if ($rule == "2022_Lynns_Softball_COED_Rules") {
        $file_name = "2022/lynns-softball/2022-Lynns-Softball-Coed-Rules.pdf";
    } else if ($rule == "2022_Lynns_Softball_Mens_Rules") {
        $file_name = "2022/lynns-softball/2022-Lynns-Softball-Mens-Rules.pdf";
    } elseif ($rule == "2022_Lynns_Softball_Info_Sheet_Fall") {
        $file_name = "2022/lynns-softball/2022-Lynns-Softball-Info-Sheet-Fall.pdf";
    } elseif ($rule == "2022_Lynns_Softball_Signup_Sheet_Fall") {
        $file_name = "2022/lynns-softball/2022-Lynns-Softball-Signup-Sheet-Fall.pdf";
    } elseif ($rule == "2022_Lynns_Softball_Sponsor_Letter") {
        $file_name = "2022/lynns-softball/2022-Lynns-Softball-Sponsor-Letter.pdf";
    } elseif ($rule == "2022_BESS_Basketball_Rules") {
        $file_name = "2022/bensons-basketball/2022-BESS-Basketball-Rules.pdf";
    } elseif ($rule == "2022_BESS_Basketball_Info_Sheet") {
        $file_name = "2022/bensons-basketball/2022-BESS-Basketball-Info-Sheet.pdf";
    } elseif ($rule == "2022_BESS_Basketball_Signup_Sheet") {
        $file_name = "2022/bensons-basketball/2022-BESS-Basketball-Signup-Sheet.pdf";
    } elseif ($rule == "2022_BESS_Basketball_Sponsor_Letter") {
        $file_name = "2022/bensons-basketball/2022-BESS-Basketball-Sponsor-Letter.pdf";
    }

    return response()->download("build/assets/content/".$file_name);
});


Route::any('/{any}', [AngularController::class, 'index'])->where('any', '^(?!api).*$');
