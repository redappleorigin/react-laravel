<?php
$request = request();

$req = [
    'headers' => [
        'host' => $request->server('HTTP_HOST'),
    ],
    'protocol' => $request->getScheme(),
    'originalUrl' => $request->path(),
];
$req = json_encode($req);

function getScript($path)
{
    return file_get_contents(public_path($path));
}

$scripts = [
    "var console = {warn: function(){}, error: print, log: function(){}};",
    "var global = global || this;",
    "var window = window || this;",
    "global.req = ${req};",
    getScript('js/common.js'),
    getScript('js/Server.js'),
];

$concatenated = implode("\n", $scripts);

try {
    ob_start();
    (new \V8Js)->executeString($concatenated);
    $view = ob_get_clean();
    echo $view;
}
catch (\V8JsException $e) {
    dd($e->getMessage());
}
