<?php

use Illuminate\Http\Request;

use App\Http\Controllers\PosteUserController;

Route::get('/users', [PosteUserController::class, 'getUsers']);
Route::get('/users/insert_fake_data', [PosteUserController::class, 'insertFakeData']);

