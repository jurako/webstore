<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

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

        $token = Auth::attempt($request->only(['email', 'password']));

        return response()->json([
            'user'  => Auth::user(),
            'token' => $token
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

    public function logout() {
        Auth::logout();

        return response()->json(['success' => 1]);
    }

    public function verifyEmailNotice() {
        return response()->json(['message' => 'Please verify your email address']);
    }

    public function verifyEmailHandler(EmailVerificationRequest $request) {
        $request->fulfill();

        return response()->json(['success' => 1]);
    }

    public function adminLogin(Request $request) {
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ], [
            'required' => 'Please fill in :attribute field'
        ]);

        $token = Auth::guard('admin')->attempt($request->all());

        if(!$token) {
            throw ValidationException::withMessages([
                'username' => ['The provided credentials are incorrect']
            ]);
        } else {
            return response()->json([
                'user' => Auth::guard('admin')->user(),
                'token' => $token
            ]);
        }
    }

    public function adminLogout() {
        Auth::guard('admin')->logout();

        return response()->json(['success' => 1]);
    }
}
