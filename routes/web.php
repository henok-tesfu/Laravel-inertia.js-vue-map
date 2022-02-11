<?php

namespace App\Models;

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\inertia;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $location = Location::all();
    return Inertia::render('Home', ['location' => $location]);
});

// Route::get('/home', function () {
//     return inertia('Add');
// });

Route::post('/add', function (Request $request) {
    // dd($request->all());
    $vaildatedData = $request->validate([
        'placeName' => 'required|string',
        'lat' => 'required|numeric',
        'lng' => 'required|numeric',
        'category' => 'required|string'
    ]);
    return inertia("Home", Location::create($vaildatedData));
});
