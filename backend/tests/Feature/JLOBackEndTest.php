<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class JLOBackEndTest extends TestCase
{
    use RefreshDatabase; // Optionnel, si vous voulez rafraîchir la base de données entre chaque test

    public function testCreateTaskMutation()
    {
        $query = <<<GQL
        mutation {
            createTask(description: "Nouvelle tâche", status: "completed") {
                id
                description
                status
            }
        }
        GQL;

        $response = $this->postJson('/graphql', [
            'query' => $query,
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'createTask' => [
                        'id',
                        'description',
                        'status'
                    ],
                ],
            ])
            ->assertJsonPath('data.createTask.description', 'Nouvelle tâche')
            ->assertJsonPath('data.createTask.status', 'completed');
    }
}
