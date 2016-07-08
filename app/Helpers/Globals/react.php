<?php
use App\Helpers\React;

function react($component_name = '', $props = [], $options = []) {
    $react_source = file_get_contents(base_path('public/js/react.bundle.js'));
    $component_source = file_get_contents(base_path("public/js/${component_name}.js"));

    return (new React($react_source, $component_source))
        ->render($component_name, $props, $options)
    ;
}
