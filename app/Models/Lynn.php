<?php

namespace App\Models;

use A17\Twill\Models\Behaviors\HasBlocks;
use A17\Twill\Models\Behaviors\HasFiles;
use A17\Twill\Models\Behaviors\HasMedias;
use A17\Twill\Models\Behaviors\HasNesting;
use A17\Twill\Models\Behaviors\HasPosition;
use A17\Twill\Models\Behaviors\HasRevisions;
use A17\Twill\Models\Behaviors\HasSlug;
use A17\Twill\Models\Behaviors\HasTranslation;
use A17\Twill\Models\Behaviors\Sortable;
use A17\Twill\Models\Model;

class Lynn extends Model implements Sortable
{
    use HasBlocks, HasFiles, HasMedias, HasNesting, HasPosition, HasRevisions, HasSlug, HasTranslation;

    protected $fillable = [
        'published',
        'title',
        'subtitle',
        'description',
        'position',
        'publish_start_date',
    ];

    public $translatedAttributes = [
        'active',
    ];

    public $slugAttributes = [
        'title',
    ];

    public $mediasParams = [
        'custom_images' => [
            'default' => [
                [
                    'name' => 'default',
                    'ratio' => null,
                ],
            ],
            'mobile' => [
                [
                    'name' => 'mobile',
                    'ratio' => 1,
                ],
            ],
            'flexible' => [
                [
                    'name' => 'free',
                    'ratio' => 0,
                ],
                [
                    'name' => 'landscape',
                    'ratio' => 16 / 9,
                ],
                [
                    'name' => 'portrait',
                    'ratio' => 3 / 5,
                ],
            ],
        ],
    ];
}
