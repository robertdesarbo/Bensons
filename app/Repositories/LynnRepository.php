<?php

namespace App\Repositories;

use A17\Twill\Repositories\Behaviors\HandleBlocks;
use A17\Twill\Repositories\Behaviors\HandleFiles;
use A17\Twill\Repositories\Behaviors\HandleMedias;
use A17\Twill\Repositories\Behaviors\HandleNesting;
use A17\Twill\Repositories\Behaviors\HandleRevisions;
use A17\Twill\Repositories\Behaviors\HandleSlugs;
use A17\Twill\Repositories\Behaviors\HandleTags;
use A17\Twill\Repositories\Behaviors\HandleTranslations;
use A17\Twill\Repositories\ModuleRepository;
use App\Models\Lynn;

class LynnRepository extends ModuleRepository
{
    use HandleBlocks, HandleFiles, HandleMedias, HandleNesting, HandleRevisions, HandleSlugs, HandleTags, HandleTranslations;

    public function __construct(Lynn $model)
    {
        $this->model = $model;
    }

    public function allPosts()
    {
        $posts = $this->model
            ->with('slugs')
            ->published()
            ->orderBy('position', 'desc')
            ->limit(7)
            ->get();

        return $posts;
    }
}
