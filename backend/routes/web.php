<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\MessagingController;

// Jobs
Route::get('/jobs', [JobController::class, 'index']);
Route::post('/jobs', [JobController::class, 'store']);
Route::post('/jobs/{id}/approve', [JobController::class, 'approve']);

// Users
Route::post('/users', [UserController::class, 'store']);
Route::get('/users', [UserController::class, 'index']);

// Payments
Route::post('/payments', [PaymentController::class, 'store']);

// Messaging
Route::post('/messages', [MessagingController::class, 'store']);
Route::get('/messages', [MessagingController::class, 'index']);
