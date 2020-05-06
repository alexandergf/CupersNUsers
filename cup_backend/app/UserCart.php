<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserCart extends Model
{
    //
    protected $fillable = ['product_id', 'user_id', 'quantity'];
    protected $with = ['product'];

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
    public function product()
    {
        return $this->belongsTo('App\Product', 'product_id', 'id');
    }
    public function price($user_id) {
        $products = UserCart::with('product')->where('user_id', '=', $user_id)->get();
        $price = $products->sum(function($product) {
            return $product->product->price * $product->quantity;
        });
        return $price;
    }

    public function exportToOrder($user_id, $order_id) {
        $products = UserCart::with('product')->where('user_id', '=', $user_id)->get();


        foreach ($products as $product) {
            $order_product = new OrderProduct();
            $order_product->quantity = $product->quantity;
            $order_product->order_id = $order_id;
            $order_product->product_id = $product->product_id;
            $order_product->save();
        }

        return true;

    }

    public function deleteCartProducts($user_id) {
        return UserCart::with('product')->where('user_id', '=', $user_id)->delete();
    }
}
