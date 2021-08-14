<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ScheduleGameController;
use App\Http\Controllers\FieldController;
use App\Http\Controllers\FreeAgentController;
use App\Http\Controllers\RegisteredTeamController;
use App\Http\Controllers\StandingController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UmpireController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\LeagueController;
use App\Http\Controllers\SeasonController;
use App\Http\Controllers\SignUpController;
use App\Http\Controllers\HomeController;

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

    Route::get('schedule-get-scheduled-game', [ScheduleGameController::class, 'getScheduledGame']);
    Route::get('schedule-game-set-up', [ScheduleGameController::class, 'scheduleForm']);

    Route::post('schedule-game', [ScheduleGameController::class, 'scheduleGame']);
    Route::post('edit-game', [ScheduleGameController::class, 'updateGame']);
    Route::post('remove-game', [ScheduleGameController::class, 'removeGame']);

    Route::post('add-team', [TeamController::class, 'addTeam']);
    Route::post('edit-team', [TeamController::class, 'editTeam']);
    Route::post('remove-team', [TeamController::class, 'removeTeam']);

    Route::get('seasons-by-division', [SeasonController::class, 'seasons_by_division']);
    Route::get('teams-by-season', [TeamController::class, 'teams_by_season']);

    Route::post('add-league', [LeagueController::class, 'addLeague']);
    Route::post('edit-league', [LeagueController::class, 'editLeague']);
    Route::post('remove-league', [LeagueController::class, 'removeLeague']);

    Route::post('add-division', [DivisionController::class, 'addDivision']);
    Route::post('edit-division', [DivisionController::class, 'editDivision']);
    Route::post('remove-division', [DivisionController::class, 'removeDivision']);

    Route::post('add-season', [SeasonController::class, 'addSeason']);
    Route::post('edit-season', [SeasonController::class, 'editSeason']);
    Route::post('remove-season', [SeasonController::class, 'removeSeason']);
});

Route::get('session', [LoginController::class, 'session']);
Route::post('login', [LoginController::class, 'login']);
Route::get('logout', [LoginController::class, 'logout']);

Route::post('register-team', [SignUpController::class, 'registerTeam']);
Route::post('find-team', [FreeAgentController::class, 'findTeam']);
Route::post('find-players', [FreeAgentController::class, 'findPlayers']);

Route::get('home/stats', [HomeController::class, 'stats']);
Route::get('schedule', [ScheduleGameController::class, 'schedule']);
Route::get('league', [LeagueController::class, 'league']);
Route::get('standing', [StandingController::class, 'standing']);

Route::get('field', [FieldController::class, 'field']);

Route::get('team', [TeamController::class, 'team']);
Route::get('free-agent', [FreeAgentController::class, 'freeAgent']);
Route::get('team-free-agent', [FreeAgentController::class, 'teamFreeAgent']);
Route::get('registered-team', [RegisteredTeamController::class, 'registeredTeam']);

Route::get('umpire', [UmpireController::class, 'umpire']);

Route::get('active-seasons', [SeasonController::class, 'activeSeasons']);

Route::get('division', [DivisionController::class, 'division']);
Route::get('division-by-league', [DivisionController::class, 'division_by_league']);
