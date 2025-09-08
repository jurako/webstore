<?php

return [

    'paths' => ['*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'], // Allow all methods (GET, POST, etc.)

    'allowed_origins' => ['http://localhost:5173'], // Change to your SPA URL

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Allow all headers

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // Required if using cookies / auth
];
