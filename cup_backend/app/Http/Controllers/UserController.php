<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends MainController
{
    //

    public function register(Request $request)
    {
        $request = $this->data_to_request($request);
/*
        $validator = Validator::make($request, [
    		'name' => 'required',
			'email' => 'required|email',
			'password' => 'required',
    	]);
    	if ($validator->fails()) {
    		
    		return $this->incorrectResponse($validator->errors(), 417);
    	}

*/
        $user = User::create([
    		'name' => $request->name,
    		'email' => $request->email,
    		'password' => bcrypt($request->password),
    	]);
    	return $this->correctResponse(["user" => $user, "token" => $user->createToken('MyApp')->accessToken]);

    }
    public function login(Request $request)
    {
        $request = $this->data_to_request($request);
        $credentials = [
            'email'     =>  $request->email,
            'password'  =>  $request->password
        ];

        if (!Auth::attempt($credentials))
        {
            return $this->incorrectResponse(2001);
        }
        $user = auth()->user();
        return $this->correctResponse(["user" => $user, "token" => $user->createToken('MyApp')->accessToken]);

    }

    public function detail(Request $request)
    {
        # code...
        return $this->correctResponse(auth()->user());
    }
}
