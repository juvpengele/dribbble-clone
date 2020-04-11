<?php

if(! function_exists('str_unique')) {
    function str_unique($length = 30) : string
    {
        if($length <= 10) {
            throw new InvalidArgumentException('The length must be higher than 10');
        }

        return \Illuminate\Support\Str::random($length - 10) . time();
    }
}
