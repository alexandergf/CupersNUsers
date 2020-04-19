<?php

namespace App\Http\Controllers;

use App\UserWishlist;
use Illuminate\Http\Request;

class WishListController extends Controller
{
    //
    public function toggleProduct(Request $request)
    {
        # code...
        $request = $this->data_to_request($request);
        $user = auth()->user();
        $wish = UserWishlist::where('user_id', '=', $user->id)->where('product_id', '=', $request->product_id)->first();

        if ($wish) {
            $wish->delete();
        } else {
            UserWishlist::create([
                'product_id' => $request->product_id,
                'user_id' => $user->id,
            ]);
        }

        return $this->correctResponse($user->wishlist);
    }
}
