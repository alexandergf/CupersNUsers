<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class ProductPic extends Model
{
    //
    public function getPicAttribute()
    {
        return isset($this->attributes['pic']) && $this->attributes['pic'] != "" ? URL::to('storage') . '/' . $this->attributes['pic']  : null;
    }
}
