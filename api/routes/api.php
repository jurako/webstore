<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Models\Category;
use App\Models\Product;

Route::get('categories', function() {
    return DB::table('categories')->pluck('title');
});

Route::get('categories/{category_name}/products', function($category_name) {
    $category_id = Category::where('title', $category_name)->value('id');

    return Product::where('category_id', $category_id)->get();
});

Route::get('products', function(Request $request) {
    $limit = $request->query('limit');

    return Product::inRandomOrder()
        ->when($limit, function($query) use ($limit) {
            return $query->take($limit);
        })
        ->get();
});

Route::post('register', [AuthController::class, 'register']);

Route::middleware(['guest'])->group(function() {
    Route::post('login', [AuthController::class, 'login']);
});


Route::middleware(['auth'])->group(function() {

    Route::get('/email/verify', [AuthController::class, 'verifyEmailNotice'])
        ->name('verification.notice');

    //Placeholder for resend verification

    Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth', 'signed'])->group(function() {
    Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmailHandler'])
        ->name('verification.verify');
});

Route::middleware(['auth', 'verified'])->group(function() {
    Route::get('/orders', function() {
        return 'From backend orders';
    });
});
