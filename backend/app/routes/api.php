<?php

use Illuminate\Support\Facades\Route;

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

Route::group(['prefix' => 'p'], function () {
    Route::get('list', 'PokemonController@list');
    Route::post('store', 'PokemonController@store');
    Route::put('{id}/update', 'PokemonController@doUpdate');
    Route::get('{id}/get', 'PokemonController@detail');
    Route::delete('{id}/delete', 'PokemonController@doDelete');
});
