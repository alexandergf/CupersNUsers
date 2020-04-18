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
    });
});