<?php

namespace Tests\Feature\Auth;


use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;


    /** @test */
    public function a_user_can_login()
    {
        $this->withoutExceptionHandling();

        factory(User::class)->create(['email' => 'john@example.com', 'password' =>'123456']);

        $response = $this->postJson(route('auth.login'), [
                            'login' => 'john@example.com',
                            'password' => '123456'
                        ])->assertStatus(200)
                        ->json();

        $this->assertContains('api_token', array_keys($response['data']));
    }

    /** @test */
    public function to_login_it_requires_a_email_and_a_password()
    {
        $response = $this->postJson(route('auth.login'), ['login' => '', 'password' => ''])
            ->assertStatus(422)
            ->json();

        $errorResponseKeys = array_keys($response['errors']);

        $this->assertContains('login', $errorResponseKeys);
        $this->assertContains('password', $errorResponseKeys);
    }

    /** @test */
    public function a_guest_must_provide_an_existing_email_to_login()
    {

        $response = $this->postJson(route('auth.login'), [
                'login' => 'john@example.com',
                'password' => "loremipsum"
            ])->assertStatus(422)->json();

        $errorResponseKeys = array_keys($response['errors']);

        $this->assertContains('login', $errorResponseKeys);
    }

    /** @test */
    public function a_guest_must_provide_a_valid_password()
    {
        factory(User::class)->create(['password' => 'helloworld', 'email' => 'john@example.com']);

        $response = $this->postJson(route('auth.login'),
            ['login' => 'john@example.com', 'password' => 'loremipsum'])
            ->assertStatus(422)
            ->json();

        $errorResponseKeys = array_keys($response['errors']);

        $this->assertContains('login', $errorResponseKeys);
    }

    /** @test */
    public function a_user_can_also_login_with_his_username()
    {
        factory(User::class)->create(['password' => 'helloworld', 'username' => 'johndoe']);

        $response = $this->postJson(route('auth.login'), ["login" => "johndoe","password" =>"helloworld"])
            ->assertStatus(200)
            ->json();

        $this->assertContains('api_token', array_keys($response['data']));
    }


}
