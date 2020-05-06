<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// VALIDACION DE CONTRASEÑAS PARA FORGET PASS
Route::any('/verified', 	                                     'UserController@validateForget');
Route::any('/verified/finally', 	                             'UserController@finallyForget');
Route::any('/forget/validate', 	                               'UserController@validateForget');


Route::get('cancel', 'OrderController@cancel')->name('payment.cancel');
Route::get('payment/success', 'OrderController@success')->name('payment.success');


Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});
Auth::routes();