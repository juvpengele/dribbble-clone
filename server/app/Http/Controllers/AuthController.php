<?php

namespace App\Http\Controllers;

use App\User;
use  \App\Http\Resources\User as UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register()
    {
        request()->validate([
            'name'     => 'required',
            'username' => 'required|unique:users',
            'password' => 'required',
            'email'    => 'required|email|unique:users',
            'tos'      => 'required'
        ]);

        $user = User::create(request()->all());
        $token = auth()->tokenById($user->id);

        return new UserResource($user, ['api_token' => $token]);
    }

    public function login()
    {
        $credentials = request()->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        if (! $token = auth()->attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['Your credentials do not match with our records']
            ]);
        }

        return response()->json(["data" => ["api_token" => $token]]);
    }
}
