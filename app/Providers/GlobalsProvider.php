<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class GlobalsProvider extends ServiceProvider
{
    public function register()
    {
        require(app_path('Helpers/Globals/react.php'));
    }
}
