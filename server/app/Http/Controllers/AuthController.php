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
        $token = $user->createToken(request('email'));

        return new UserResource($user, ['api_token' => $token->plainTextToken]);
    }

    public function login()
    {
        request()->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ]);

        $user = User::whereEmail(request('email'))->first();

        if(! Hash::check(request('password'), $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Your credentials do not match with our records']
            ]);
        }

        $token = $user->createToken(request('email'));

        return new UserResource($user, ['api_token' => $token->plainTextToken]);
    }
}
