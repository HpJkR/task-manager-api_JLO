<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\Models\Tag;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;
use Rebing\GraphQL\Support\Facades\GraphQL; 

class TagType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Tag',
        'description' => 'A group of tasks',
        'model' => Tag::class, 
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'The id of the tag',
            ],
            'name' => [
                'type' => Type::string(),
                'description' => 'The name of the tag',
            ],
            'color_code' => [
                'type' => Type::string(),
                'description' => 'The color code associated with the tag',
            ],
            
            'tasks' => [
                'type' => Type::listOf(GraphQL::type('Task')), 
                'description' => 'The tasks associated with this tag',
            ],
        ];
    }
}
