<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\HandleCors as Middleware;

class HandleCors extends Middleware
{
    public function __construct()
    {
        $this->setCorsOptions([
            'allowed_origins' => ['http://localhost:5173'],
            'allowed_methods' => ['*'],
            'allowed_headers' => ['*'],
            'supports_credentials' => true,
            'max_age' => 0,
        ]);
    }
}
