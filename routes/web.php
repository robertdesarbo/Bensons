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
        $file_name = "2024/2024-ASA-Non-Approved-BatList.pdf";
    } else if ($rule == "Ground_Rules") {
        $file_name = "2024/2024-Ground-Rules.pdf";
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
        $file_name = "20223/bensons-softball/2022-Bess-Softball-Friday-Night-Rules.pdf";
    } else if ($rule == "2023_Lynns_Softball_COED_Rules") {
        $file_name = "2023/lynns-softball/2023-Lynns-Softball-Coed-Rules.pdf";
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
    } elseif ($rule == "2024_BESS_Basketball_Info_Sheet") {
        $file_name = "2024/bensons-basketball/2024-BESS-Basketball-Info-Sheet.pdf";
    } elseif ($rule == "2024_BESS_Basketball_Info_Sheet_Winter") {
        $file_name = "2024/bensons-basketball/2024-BESS-Basketball-Info-Sheet-Winter.pdf";
    } elseif ($rule == "2024_BESS_Basketball_Signup_Sheet") {
        $file_name = "2024/bensons-basketball/2024-BESS-Basketball-Signup-Sheet.pdf";
    } elseif ($rule == "2024_BESS_Basketball_Signup_Sheet_Winter") {
        $file_name = "2024/bensons-basketball/2024-BESS-Basketball-Signup-Sheet-Winter.pdf";
    } elseif ($rule == "2024_BESS_Basketball_Sponsor_Letter") {
        $file_name = "2024/bensons-basketball/2024-BESS-Basketball-Sponsor-Letter.pdf";
    } elseif ($rule == "2024_BESS_Softball_Info_Sheet_And_Signup_Sheet") {
        $file_name = "2023/bensons-softball/2023-BESS-Softball-Info-Sheet-And-Signup-Sheet.pdf";
    } elseif ($rule == "2023_BESS_Softball_Sponsor_Letter") {
        $file_name = "2023/bensons-softball/2023-BESS-Softball-Sponsor-Letter.pdf";
    } elseif ($rule == "2023_BESS_Softball_Legislative_Info_Sheet_And_Signup_Sheet") {
        $file_name = "2023/lynns-legislative-softball/2023-Lynns-Legislative-Softball-Info-Sheet-And-Signup-Sheet.pdf";
    } elseif ($rule == "2023_BESS_Softball_Legislative_Sponsor_Letter") {
        $file_name = "2023/lynns-legislative-softball/2023-Lynns-Legislative-Softball-Sponsor-Sheet.pdf";
    } elseif ($rule == "2023_Fall_Lynns_Softball_Signup_Sheet") {
        $file_name = "2023/lynns-softball/2023-Fall-Lynns-Softball-Signup-Sheet.pdf";
    } elseif ($rule == "2023_Fall_Lynns_Softball_Info_Sheet") {
        $file_name = "2023/lynns-softball/2023-Fall-Lynns-Softball-Info-Sheet.pdf";
    } elseif ($rule == "2023_Fall_Lynns_Softball_Sponsor_Letter") {
        $file_name = "2023/lynns-softball/2023-Fall-Lynns-Softball-Sponsor-Sheet.pdf";
    } elseif ($rule == "2023_BESS_Code_of_Conduct_Policy") {
        $file_name = "2023/2023-BESS-Code-of-Conduct-Policy.pdf";
    } elseif ($rule == "2024_BESS_Basketball_Rules") {
        $file_name = "2024/bensons-basketball/2024-BESS-Basketball-Rules.pdf";
    }

    // START - 2024
    if ($rule == "2024_Lynns_Softball_Info_Sheet_And_Signup_Sheet") {
        $file_name = "2024/lynns-softball/2024-Lynns-Softball-Info-Sheet-And-Signup-Sheet.pdf";
    } else if ($rule == "2024_Lynns_Softball_Sponsor_Letter") {
        $file_name = "2024/lynns-softball/2024-Lynns-Softball-Sponsor-Letter.pdf";
    } else if ($rule == "2024_Lynns_Softball_COED_Rules") {
        $file_name = "2024/lynns-softball/2024-Lynns-Softball-Coed-Rules.pdf";
    } else if ($rule == "2024_Lynns_Softball_Mens_Rules") {
        $file_name = "2024/lynns-softball/2024-Lynns-Softball-Mens-Rules.pdf";
    } else if ($rule == "2024_Fall_Lynns_Softball_Sponsor_Letter") {
        $file_name = "2024/lynns-softball/2024-Fall-Lynns-Softball-Sponsor-Letter.pdf";
    } else if ($rule == "2024_Fall_Lynns_Softball_Info_Sheet") {
        $file_name = "2024/lynns-softball/2024-Fall-Lynns-Softball-Info-Sheet.pdf";
    } else if ($rule == "2024_Fall_Lynns_Softball_Signup_Sheet") {
        $file_name = "2024/lynns-softball/2024-Fall-Lynns-Softball-Signup-Sheet.pdf";
    }

    if ($rule == "2024_BESS_Softball_Legislative_Info_Sheet_And_Signup_Sheet") {
        $file_name = "2024/lynns-legislative-softball/2024-Lynns-Legislative-Softball-Info-Sheet-And-Signup-Sheet.pdf";
    } else if ($rule == "2024_BESS_Softball_Legislative_Sponsor_Letter") {
        $file_name = "2024/lynns-legislative-softball/2024-Lynns-Legislative-Softball-Sponsor-Letter.pdf";
    }

    if ($rule == "2024_BESS_Softball_Info_Sheet_And_Signup_Sheet") {
        $file_name = "2024/bensons-softball/2024-BESS-Softball-Info-Sheet-And-Signup-Sheet.pdf";
    } else if ($rule == "2024_BESS_Softball_Sponsor_Letter") {
        $file_name = "2024/bensons-softball/2024-BESS-Softball-Sponsor-Letter.pdf";
    }
    // END - 2024

    // START - 2025
    if ($rule == "2025_BESS_Basketball_Signup_Sheet") {
        $file_name = "2025/bensons-basketball/2025-BESS-Basketball-Signup-Sheet.pdf";
    } else if ($rule == "2025_BESS_Basketball_Info_Sheet") {
        $file_name = "2025/bensons-basketball/2025-BESS-Basketball-Info-Sheet.pdf";
    } else if ($rule == "2025_BESS_Basketball_Sponsor_Letter") {
        $file_name = "2025/bensons-basketball/2025-BESS-Basketball-Sponsor-Letter.pdf";
    }

    return response()->download("build/assets/content/".$file_name);
});


Route::any('/{any}', [AngularController::class, 'index'])->where('any', '^(?!api).*$');
