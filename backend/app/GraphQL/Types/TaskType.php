<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\Models\Task;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class TaskType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Task',
        'description' => 'A Task',
        'model' => Task::class,
    ];
    
    public function fields(): array
{
    return [
        'id' => [
            'type' => Type::nonNull(Type::string()),
            'description' => 'The id of the task',
        ],
        'description' => [
            'type' => Type::string(),
            'description' => 'The description of the task',
        ],
        'status' => [
            'type' => Type::string(),
            'description' => 'The status of the task',
        ],
        
    ];
}

}    
