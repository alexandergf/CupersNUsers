<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class ProductPic extends Model
{
    //
	protected $table = 'product_pics';
	
	public function product()
    {
        return $this->belongsTo('App\Product', 'product_id', 'id');
    }
	
    public function getPicAttribute()
    {
        return isset($this->attributes['pic']) && $this->attributes['pic'] != "" ? URL::to('public/storage') . '/' . $this->attributes['pic']  : null;
    }
	
    public function getPicEditAttribute()
    {
        //
        return $this->attributes['pic'];
    }

}
