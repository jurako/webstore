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

    if(!$category_id) {
        return response()->json([
            'error' => 'Resource Not Found',
            'message' => sprintf('Category with name %s not found.', $category_name)
        ], 404);
    }

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
    Route::post('admin/login', [AuthController::class, 'adminLogin']);
});


Route::middleware(['auth'])->group(function() {

    //TO DO: fix this route, it is available event after user has veryfied his email
    // 1. Add a check in vue-router's - if user is already verified, redirect it home (or somewhere else? think about this);
    // 2. Check this endpoint in Postman, for pure API level request - think about, what response should be sent back (maybe laravel docs has already a solution for this case)
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



/**
 *
 * Admin endpoints
 *
 */
Route::middleware('auth:admin')->group(function() {
    Route::post('admin/logout', [AuthController::class, 'adminLogout']);

    Route::get('test-admin', function() {
        return 'From test admin';
    });
});

Route::fallback(function(Request $request) {
    return response()->json([
        'error' => 'Page Not Found',
        'message' => sprintf('The requested path %s does not exist.', $request->path())
    ], 404);
});