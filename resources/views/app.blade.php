<?php
$request = request();

$req = [
    'headers' => [
        'host' => $request->server('HTTP_HOST'),
    ],
    'protocol' => $request->getScheme(),
    'originalUrl' => $request->path(),
];

$auth = [
    'guest' => Auth::guest(),
    'user' => [
        'name' => Auth::user()->name ?? null,
    ],
];

$flash = $request
    ->session()
    ->all()
;

$session = array_merge(
    $flash['flash'] ?? ['old' => [], 'new' => []],
    ['status' => session('status')]
);

$csrf = [
    'token' => csrf_token(),
];

$validation = $errors->messages();

$scripts = [
    "function dd(arg) { var value = JSON.stringify(arg); print(value); exit();}",
    "var console = {warn: function(){}, error: print, log: function(){}};",
    "var global = global || this;",
    "var window = window || this;",
    "var self = self || this;",
    file_get_contents(base_path('resources/server/Server.js')),
];

$concatenated = implode("\n", $scripts);

try {
    ob_start();

    $v8 = (new \V8Js);
    $v8->req = $req;
    $v8->auth = $auth;
    $v8->csrf = $csrf;
    $v8->session = $session;
    $v8->validation = $validation;
    $v8->executeString($concatenated);

    $view = ob_get_clean();

    echo $view;
}
catch (\V8JsException $e) {
    dd($e);
}
