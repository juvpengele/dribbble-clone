<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    private $options;

    public function __construct($resource, $options = [])
    {
        $this->options = $options;
        parent::__construct($resource);
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return array_merge([
            'username' => $this->username,
            'name'   => $this->name,
            'email' => $this->email,
        ], $this->options);
    }
}
