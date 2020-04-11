<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{

    /** @test */
    public function a_guest_can_see_a_hello_world()
    {
        $response = $this->getJson('/api')->json();

        $this->assertEquals('Application running', $response['status']);
    }
}
