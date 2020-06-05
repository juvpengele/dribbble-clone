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
            'login' => 'required',
            'password' => 'required'
        ]);

        $user = User::where(['email' => $credentials['login']])
                ->orWhere(['username' => $credentials['login']])
                ->first();

        if(! $user) {
            throw ValidationException::withMessages([
                'login' => ['Your username / email does exist in our records']
            ]);
        }

        $token = $this->attemptLogin(["email" => $user->email, "password" => $credentials["password"]]);

        return $this->responseWithToken($user, $token);
    }

    /**
     * @param $user
     * @param string $token
     * @return UserResource
     */
    private function responseWithToken($user, string $token): UserResource
    {
        return new UserResource($user, ['api_token' => $token]);
    }

    private function attemptLogin(array $credentials) : string
    {

        if(! $token = auth()->attempt($credentials)) {
            throw ValidationException::withMessages([
                'login' => ['Your credentials do not match with our records']
            ]);
        }

        return $token;
    }
}
