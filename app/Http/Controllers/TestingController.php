<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;

class TestingController extends Controller
{
    public function resetDb(Request $request)
    {
        $request->validate([
            'password' => ['required', 'string'],
        ]);

        if (!Hash::check($request->password, auth()->user()->password)) {
            return response()->json([
                'message' => 'Password does not match.'
            ], 403);
        }

        Artisan::call('migrate:fresh', [
            '--seed' => true,
            '--force' => true,
        ]);

        return response()->json([
            'message' => 'Database reset and seeded successfully!'
        ]);
    }
}
