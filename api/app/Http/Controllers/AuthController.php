<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register (Request $request) {

        $request->validate([
            'name' => ['required'],
            'lastname' => ['required'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required'],
        ],
        [
            'required' => 'Please fill in :attribute field',
            'email.email' => 'Please enter a valid email address',
            'email.unique' => 'This email is already in use'
        ]);

        $user = User::create([
            'name' => $request->input('name'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ]);

        //email verification
        event(new Registered($user));

        return response()->json([
            'emailVerifyMessage' => 'Registration successful. Please verify your email'
        ]);
    }

    public function login(Request $request) {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ],
        [
            'required' => 'Please fill in :attribute field',
            'email.email' => 'Please enter a valid email address'            
        ]);

        $token = Auth::attempt($request->all());

        if(!$token) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect']
            ]);
        } else {
            return response()->json([
                'user' => Auth::user(),
                'token' => $token
            ]);
        }
    }

    public function verifyEmailNotice() {
        return response()->json(['message' => 'Please verify your email address']);
    }

    public function verifyEmailHandler() {
        return response()->json(['message' => 'Email has been verified']);
    }
}
