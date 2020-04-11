<?php

namespace Tests\Feature\Auth;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    private function getUserAttributes($attributes = []) : array
    {
        return array_merge(
            factory(User::class)->raw($attributes),
            ['tos' => 'on']
        );
    }

    /** @test */
    public function a_guest_can_sign_up()
    {
        $userAttributes = $this->getUserAttributes();

        $this->postJson(route('auth.register'), $userAttributes)
                        ->assertStatus(201)
                        ->json();

        $this->assertDatabaseHas('users', ['name' => $userAttributes['name']]);
    }

    /** @test */
    public function registration_requires_a_name()
    {
        $userAttributes = $this->getUserAttributes(['name' => '']);

        ['errors' => $errors] = $this->postJson(route('auth.register'), $userAttributes)
            ->assertStatus(422)
            ->json();

        $this->assertContains('name', array_keys($errors));
    }


    /** @test */
    public function registration_requires_a_username()
    {
        $userAttributes = $this->getUserAttributes(['username' => '']);

        ['errors' => $errors] = $this->postJson(route('auth.register'), $userAttributes)
            ->assertStatus(422)
            ->json();

        $this->assertContains('username', array_keys($errors));
    }

    /** @test */
    public function registration_requires_an_email()
    {
        $userAttributes = factory(User::class)->raw(['email' => '']);

        ['errors' => $errors] = $this->postJson(route('auth.register'), $userAttributes)
            ->assertStatus(422)
            ->json();

        $this->assertContains('email', array_keys($errors));
    }

    /** @test */
    public function registration_requires_a_unique_email()
    {
        factory(User::class)->create(['email' => 'john@example.com']);
        $userAttributes = factory(User::class)->raw(['email' => 'john@example.com']);

        ['errors' => $errors] = $this->postJson(route('auth.register'), $userAttributes)
            ->assertStatus(422)
            ->json();

        $this->assertContains('email', array_keys($errors));
    }

    /** @test */
    public function registration_requires_a_unique_username()
    {
        factory(User::class)->create(['username' => 'JohnDoe']);
        $userAttributes = factory(User::class)->raw(['username' => 'JohnDoe']);

        ['errors' => $errors] = $this->postJson(route('auth.register'), $userAttributes)
            ->assertStatus(422)
            ->json();

        $this->assertContains('username', array_keys($errors));
    }

    /** @test */
    public function registration_requires_a_password()
    {
        $userAttributes = factory(User::class)->raw(['password' => '']);

        ['errors' => $errors] = $this->postJson(route('auth.register'), $userAttributes)
                                     ->assertStatus(422)->json();

        $this->assertContains('password', array_keys($errors));
    }

    /** @test */
    public function registration_requires_terms_of_services()
    {
        $userAttributes = factory(User::class)->raw();

        ['errors' => $errors] = $this->postJson(route('auth.register'), $userAttributes)
                                     ->assertStatus(422)->json();

        $this->assertContains('tos', array_keys($errors));
    }

    /** @test */
    public function when_a_guest_sign_up_it_receives_a_token()
    {
        $userAttributes = $this->getUserAttributes();

        $response = $this->postJson(route('auth.register'), $userAttributes)
                         ->json();

        $this->assertContains('api_token', array_keys($response['data']));
    }
}
