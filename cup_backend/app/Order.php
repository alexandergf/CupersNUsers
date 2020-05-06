<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    protected $with = ['products'];

    public function products()
    {
        return $this->hasMany('App\OrderProduct');
    }
}
