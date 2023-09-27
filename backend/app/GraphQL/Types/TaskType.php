<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\Models\Tag;
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
        
    ];
}

}    
