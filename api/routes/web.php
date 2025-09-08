<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function() {
    return response()->json([
        [
            "id" => 1,
            "name" => "John Doe",
            "age" => 28
        ],
        [
            "id" => 2,
            "name" => "Tom Cruz",
            "age" => 30
        ],
        [
            "id" => 3,
            "name" => "Brad Pitt",
            "age" => 50
        ]
    ]);
});