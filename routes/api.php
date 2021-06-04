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
    Route::get('user', function (Request $request) {
        return $request->user();
    });

    Route::get('schedule-get-divisions', [ScheduleGameController::class, 'getDivisions']);
    Route::get('schedule-get-scheduled-game', [ScheduleGameController::class, 'getScheduledGame']);
    Route::get('schedule-game-set-up', [ScheduleGameController::class, 'scheduleForm']);

    Route::post('schedule-game', [ScheduleGameController::class, 'scheduleGame']);
    Route::post('edit-game', [ScheduleGameController::class, 'editGame']);
    Route::post('remove-game', [ScheduleGameController::class, 'removeGame']);
});

Route::get('schedule', [ScheduleGameController::class, 'schedule']);

Route::get('session', [LoginController::class, 'session']);
Route::post('login', [LoginController::class, 'login']);
Route::get('logout', [LoginController::class, 'logout']);
