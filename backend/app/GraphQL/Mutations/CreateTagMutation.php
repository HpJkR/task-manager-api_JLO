<?php

declare(strict_types=1);

namespace App\GraphQL\Mutations;

use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;
use Rebing\GraphQL\Support\SelectFields;
use App\Models\Tag; 
use Rebing\GraphQL\Support\Facades\GraphQL;

class CreateTagMutation extends Mutation
{
    protected $attributes = [
        'name' => 'createTag',
        'description' => 'A mutation'
    ];

    public function type(): Type
    {
        return GraphQL::type('Tag');
    }

    public function args(): array
{
    return [
        'name' => ['name' => 'name', 'type' => Type::string()],
        'color_code' => ['name' => 'color_code', 'type' => Type::string()],
    ];
}


    public function resolve($root, array $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $fields = $getSelectFields();
        $select = $fields->getSelect();
        $with = $fields->getRelations();
        $tag = new Tag();
        $tag->name = $args['name'];
        $tag->color_code = $args['color_code'];
        $tag->save();

        return $tag;
    }
}
