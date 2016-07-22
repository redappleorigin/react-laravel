<?php
use App\Models\User;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('app');
});

Route::auth();

Route::get('/dashboard', 'DashboardController@index');

Route::get('/users', function() {
    return User::select()
        ->get()
        ->toArray()
    ;
});

if (config('app.debug'))
{
    Route::get('/js/{path}', function($path) {
        return file_get_contents('http://localhost:8080/js/' . $path);
    });
}
