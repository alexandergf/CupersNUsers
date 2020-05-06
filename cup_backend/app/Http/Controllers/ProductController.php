<?php

namespace App\Http\Controllers;

use App\Product;
use App\ProductCategory;
use Illuminate\Http\Request;

class ProductController extends MainController
{
    //
    public function getAll(Request $request)
    {
        # code...
        return $this->correctResponse(Product::get());
    }

    public function getCategories(Request $request)
    {
        # code...
        return $this->correctResponse(ProductCategory::get());
    }

    public function getByCategory(Request $request)
    {
        # code...
        $request = $this->data_to_request($request);
        return $this->correctResponse(Product::where('category_id', '=', $request->category_id)
                                                ->get());
    }

    public function getByName(Request $request)
    {
        # code...
        $request = $this->data_to_request($request);
        return $this->correctResponse(Product::where('name', 'like', '%' . $request->category_id . '%')
                                                ->get());
    }

    public function getByPrice(Request $request)
    {
        # code...
    }
    public function getReviews(Request $request)
    {
        # code...
        $request = $this->data_to_request($request);
        return $this->correctResponse(Product::where('id', '=', $request->product_id)
                                                ->first()->reviews);
    }
    public function detail(Request $request)
    {
        # code...
        $request = $this->data_to_request($request);
		return $this->correctResponse(Product::with('reviews')->where('id', '=', $request->product_id)
                                                ->first());
    }
}
