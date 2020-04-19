<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'user'], function(){
    Route::post('register', 	                                  'UserController@register');
    Route::post('login', 		                                   'UserController@login');
    Route::post('forget', 		                                  'UserController@forget');

});

Route::group(['middleware' => 'auth:api'], function() {
    Route::group(['prefix' => 'user'], function(){
        Route::get('detail', 	'UserController@detail');
        Route::post('edit', 	'UserController@edit');
        Route::post('changePassword', 	'UserController@changePassword');
        Route::post('setReview', 	'UserController@setReview');
        Route::get('getReviews', 	'UserController@getReviews');
        Route::get('getWishlist', 	'UserController@getWishlist');
        Route::get('getCart', 	'UserController@getCart');
    });
    Route::group(['prefix' => 'product'], function(){
        Route::get('getAll', 	'ProductController@getAll');
        Route::get('getCategories', 	'ProductController@getCategories');
        Route::get('getByCategory', 	'ProductController@getByCategory');
        Route::get('getByName', 	'ProductController@getByName');
        Route::get('getReviews', 	'ProductController@getReviews');
        Route::get('detail', 	'ProductController@detail');
    });
    Route::group(['prefix' => 'cart'], function(){
        Route::get('toggleProduct', 	'CartController@toggleProduct');
    });
    Route::group(['prefix' => 'wishlist'], function(){
        Route::get('toggleProduct', 	'WishListController@toggleProduct');
    });
});