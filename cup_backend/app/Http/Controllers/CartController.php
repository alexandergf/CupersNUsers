<?php

namespace App\Http\Controllers;

use App\UserCart;
use Illuminate\Http\Request;

class CartController extends MainController
{
    //
    public function toggleProduct(Request $request)
    {
        # code...
        $request = $this->data_to_request($request);
        $user = auth()->user();
		$cart = UserCart::where('user_id', '=', $user->id)->where('product_id', '=', $request->product_id)->first();

        if ($cart) {
            $cart->delete();
        } else {
            $cart = UserCart::create([
                'product_id' => $request->product_id,
                'user_id' => $user->id,
            ]);
			
        }

        return $this->correctResponse($user->cart);
    }
}
