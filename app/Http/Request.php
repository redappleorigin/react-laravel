<?php
namespace App\Http;

use Illuminate\Http\Request as BaseRequest;

class Request extends BaseRequest {
    public function ajax()
    {
        /* 1. Call the builtin method */
        if ($this->isXmlHttpRequest())
        {
            return true;
        }

        /* 2. Check the Content-Type */
        $content_type = strtolower($this->header('Content-Type'));

        $allowable_types = [
            'application/json',
            'application/javascript',
        ];

        $is_allowed = in_array($content_type, $allowable_types);

        if ($is_allowed) {
            return true;
        }

        /* 3. Otherwise, not Ajax */
        return false;
    }
}
