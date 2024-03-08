<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\productController;
use App\Http\Controllers\Api\kitchenController;
use App\Http\Controllers\Api\deliveryController;
use App\Http\Controllers\Api\loginController;
use App\Http\Controllers\Api\saleController;
use App\Http\Controllers\Api\typeServiceController;
use App\Http\Controllers\Api\bannerController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::controller(saleController::class)->group(function (){
    Route::get('/{kitchen}/sales',                  'index');
    Route::post('/{kitchen}/sale',                  'store');
});
Route::controller(kitchenController::class)->group(function (){
    Route::get('/{kitchen}/kitchen',                'index');
    Route::get('/{kitchen}/kitchen/{id}',           'show');
    Route::put('/{kitchen}/kitchen/{id}',           'update');
});
Route::controller(deliveryController::class)->group(function (){
    Route::get('/{kitchen}/deliverys',              'index');
    Route::get('/{kitchen}/delivery/{id}',          'show');
    Route::put('/{kitchen}/delivery/{id}',          'update');
});
Route::controller(bannerController::class)->group(function (){
    Route::get('/{kitchen}/banners',                'index');
    Route::post('/{kitchen}/bannerC',               'store');
    Route::get('/{kitchen}/banner/{id}',            'show');
    Route::post('/{kitchen}/bannerE/{id}',          'update');
    Route::delete('/{kitchen}/banner/{id}',         'destroy');
});
Route::controller(typeServiceController::class)->group(function (){
    Route::get('/{kitchen}/typeS',                  'index');
    Route::post('/{kitchen}/type',                  'store');
    Route::get('/{kitchen}/type/{id}',              'show');
    Route::put('/{kitchen}/type/{id}',              'update');
    Route::delete('/{kitchen}/type/{id}',           'destroy');
});
Route::controller(loginController::class)->group(function (){
    Route::post('/login',                           'login');
    Route::post('/register',                        'register');
    Route::post('/{kitchen}/logout',                'logout');
    Route::get('/user',                             'user')->middleware('auth:sanctum');
})->withoutMiddleware(['csrf']);
Route::controller(productController::class)->group(function (){
    Route::get('/{kitchen}/products',               'index');
    Route::get('/{kitchen}/productsAll',            'productsAll');
    Route::post('/{kitchen}/product',               'store');
    Route::post('/{kitchen}/productC',              'productC');
    Route::get('/{kitchen}/product/{id}',           'show');
    Route::get('/{kitchen}/productE/{id}',          'productE');
    Route::put('/{kitchen}/product/{id}',           'update');
    Route::post('/{kitchen}/productup/{id}',        'updateProd');
    Route::delete('/{kitchen}/product/{id}',        'destroy');
    Route::delete('/{kitchen}/productdel/{id}',     'productdel');
});