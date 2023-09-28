<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use App\Models\Task;
use Rebing\GraphQL\Support\Facades\GraphQL;

class DeleteCompletedTasksMutation extends Mutation
{
    protected $attributes = [
        'name' => 'deleteCompletedTasks',
        'description' => 'Supprime toutes les tâches terminées'
    ];

    public function type(): Type
    {
        return Type::boolean();
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        try {
            $deletedRows = Task::where('status', 'completed')->delete();
            return $deletedRows > 0;
        } catch (\Exception $e) {
            return false;
        }
    }
}
