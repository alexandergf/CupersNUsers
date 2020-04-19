<?php

namespace App\Http\Controllers;

use App\Mail\MailForgetPass;
use App\Product;
use App\Review;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
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

    public function forget(Request $request)
    {
        # code...
        $request = $this->data_to_request($request);
          $validator = Validator::make($request->all(), [
            'email'                 => 'required|string',

          ]);
          if ($validator->fails()) {

            return $this->incorrectResponse(2001,$validator->errors());
          }


          $user = User::where("email",$request->email)->first();
          if ($user)
          {
              // creamos un token
              $token = substr(uniqid(rand(), true), 10, 10);
              $user->remember_token = $token;
              $user->save();
              try {
                Mail::to($user->email)->send(new MailForgetPass($user,$token));

              }catch(\Exception $e)
              {
                dd($e);
                return $this->incorrectResponse(25001);
              }
              return $this->correctResponse();

          }

    }

    public function validateForget(Request $request)
    {
          // verificamos
          $validator = Validator::make($request->all(), [
            'token'                 => 'required|string',
            'email'                 => 'required|string',

          ]);
          if ($validator->fails()) {

            return redirect('/');
          }
          $user = User::where('email',$request->email)->first();
          if ($user)
          {
              if ($user->remember_token == $request->token)
              {
                $token = substr(uniqid(rand(), true), 10, 10);
                $user->remember_token = $token;
                $user->save();
                return view('verified')->with('token',$token)->with("email",$request->email);

              } else {
                  return redirect('/');
              }

          } else {
            return redirect('/');
          }
      }

      public function FinallyForget(Request $request)
      {
            $validator = Validator::make($request->all(), [
            'password'              => 'required|string',
            'token'                 => 'required|string',
            'email'                 => 'required|string',

          ]);
          if ($validator->fails()) {

            return redirect('/');
          }
          // validamos el usuario
          $user = User::where('email',$request->email)->first();
          // si no hay usuario nada,
          if ($user and $user->remember_token == $request->token)
          {
            $user->password                 =   bcrypt($request->input('password'));
            $user->remember_token = null;
            $user->save();
            return redirect('/');

          } else {
              return redirect('/');
          }
      }

      public function edit(Request $request)
      {
          # code...
      }
      public function changePassword(Request $request)
      {
          # code...
      }
      public function setReview(Request $request)
      {
          # code...
          $request = $this->data_to_request($request);
          $user = auth()->user();
          $review = Review::create([
            'rate' => $request->rate,
            'description' => $request->description,
            'product_id' => $request->product_id,
            'user_id' => $user->id,
          ]);

          return $this->correctResponse(Product::where('id', '=', $request->product_id)->first()->reviews);


      }
      public function getReviews(Request $request)
      {
          # code...

          return $this->correctResponse(auth()->user()->reviews ?? []);
      }
      public function getWishlist(Request $request)
      {
          # code...

          return $this->correctResponse(auth()->user()->wishlist ?? []);
      }
      public function getCart(Request $request)
      {
          # code...

          return $this->correctResponse(auth()->user()->cart);
      }




}
