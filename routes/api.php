<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ScheduleGameController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get( 'user', function (Request $request) {
        return $request->user();
    });


    Route::get( 'schedule-game-set-up', [ScheduleGameController::class, 'scheduleForm']);

});

Route::post( 'login', [LoginController::class, 'login']);
Route::get( 'logout', [LoginController::class, 'logout']);
