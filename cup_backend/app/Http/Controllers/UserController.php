<?php

namespace App\Http\Controllers;

use App\Mail\MailForgetPass;
use App\Product;
use App\Review;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
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
        $validator = Validator::make($request->all(), [
          'email'     => 'required|string|email|unique:users',
          'password'  => 'required|string',
        ]);

        if ($validator->fails()) {
          return $this->incorrectResponse(1,$validator->errors());
        }

        $user = User::create([
          'name' => $request->name,
          'surnames' => $request->surnames,
          'phone' => $request->phone,
          'direction' => $request->direction,
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
          if ($validator->fails()) 
          {
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
          $media = $request->media;
          $request = $this->data_to_request($request);
          $user = auth()->user();

          if ( $this->checkParam($request->email) && $user->email != $request->email) 
          {
            $rules = [
                'email'     => 'string|email|unique:users',
            ];
            $customMessages = [
                'email.string' => 'string',
                'email.unique' => 'unique',
                'email.email' => 'email',
            ];
            $validator = Validator::make($request->all(), $rules, $customMessages );
  
            if ($validator->fails()) 
            {
              $response = [
                "info" => $validator->errors()
              ];
              $num = 4001;
              $validator->errors()->get("email")[0] == "unique" ? $num = 2202 : false;
              $validator->errors()->get("email")[0] == "email" ? $num = 4015 : false;
              return $this->incorrectResponse($num, $response);
            }
          }
          $this->checkParam($request->email) ?  
                $user->email = $request->email : false;
          $this->checkParam($request->surnames) ?  
              $user->surnames = $request->surnames : false;
          $this->checkParam($request->phone) ?  
              $user->phone = $request->phone : false;
          $this->checkParam($request->direction) ?  
              $user->direction = $request->direction : false;

          if ($media) {
            $image = $media;
            $destinationPath = public_path('/storage/users');
            $name = md5($image->getClientOriginalName() . time());
            try {
              if ($this->save_image($destinationPath, $image, $name)) {
                if ($user->pic != "" && !is_null($user->pic)) {
                  File::delete('storage/users/' . $user->pic);
                }
                $user->pic = 'users/' . $name.'.'.$image->getClientOriginalExtension();
              }
            } catch (\Exception $e) {
              dd($e);
            }
          }
          
          return $this->correctResponse($user);

      }
      public function changePassword(Request $request)
      {
          # code...
          $request = $this->data_to_request($request);
          $user = auth()->user();

          if ($user->password != bcrypt($request->old_password)) 
          {
            return $this->incorrectResponse(4001);
          }

          $user->password = $request->password;

          $user->save();

          return $this->correctResponse($user);


      }
      public function setReview(Request $request)
      {
          # code...
          $request = $this->data_to_request($request);
          $user = auth()->user();
          Review::create([
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
