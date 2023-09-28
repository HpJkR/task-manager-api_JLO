<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\Models\Task;
use Rebing\GraphQL\Support\Facades\GraphQL;

class UpdateTaskMutation extends Mutation
{
    protected $attributes = [
        'name' => 'updateTask',
        'description' => 'Met à jour une tâche existante'
    ];

    public function type(): Type
    {
        return GraphQL::type('Task');
    }

    public function args(): array
    {
        return [
            'id' => ['name' => 'id', 'type' => Type::nonNull(Type::int())],
            'description' => ['name' => 'description', 'type' => Type::string()],
            'status' => ['name' => 'status', 'type' => Type::string()],
        ];
    }

    public function resolve($root, array $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $task = Task::find($args['id']);

        if (!$task) {
            return null;
        }

        if (isset($args['description'])) {
            $task->description = $args['description'];
        }

        if (isset($args['status'])) {
            $task->status = $args['status'];
        }

        $task->save();

        return $task;
    }
}
