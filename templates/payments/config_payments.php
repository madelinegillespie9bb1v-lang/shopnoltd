<?php
// config_payments.php - place your real keys here
return [
    'payeer' => [
        'merchant_id' => getenv('PAYEER_MERCHANT') ?: 'YOUR_PAYEER_MERCHANT_ID',
        'secret_key'  => getenv('PAYEER_SECRET') ?: 'YOUR_PAYEER_SECRET'
    ],
    'binance' => [
        'api_key' => getenv('BINANCE_API') ?: 'YOUR_BINANCE_API_KEY',
        'secret_key' => getenv('BINANCE_SECRET') ?: 'YOUR_BINANCE_SECRET'
    ],
    'stripe' => [
        'publishable_key' => '',
        'secret_key' => ''
    ]
];
