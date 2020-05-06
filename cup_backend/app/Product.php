<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class Product extends Model
{
    //
	protected $table = 'products';

    protected $with = ['pics'];

    public function reviews()
    {
        return $this->hasMany('App\Review', 'product_id', 'id')->with('user');
    }
    public function pics()
    {
		return $this->hasMany('App\ProductPic');
    }

}
