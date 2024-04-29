<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function session(Request $request): JsonResponse
    {
        $session = false;
        $user = null;

        if (Auth::check()) {
            $session = true;
            $user = Auth::user();
        }

        return response()->json([
            'success' => $session,
            'user' => $user,
        ]);
    }

    public function login(Request $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        $session = false;
        $user = null;
        if (Auth::attempt($credentials)) {
            $session = true;
            $user = Auth::user();
        }

        return response()->json([
            'success' => $session,
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();
    }
}
