<?php

namespace App\Http\Controllers;

use App\User;
use  \App\Http\Resources\User as UserResource;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register()
    {
        request()->validate([
            'name'     => 'required',
            'username' => 'required|unique:users',
            'password' => 'required',
            'email'    => 'required|unique:users',
            'tos'      => 'required'
        ]);

        $user = User::create(request()->all());

        return new UserResource($user);
    }
}
