<?php

namespace App\Http\Controllers\Admin;

use A17\Twill\Http\Controllers\Admin\NestedModuleController as BaseModuleController;

class LynnController extends BaseModuleController
{
    protected $moduleName = 'lynns';

    protected $indexOptions = [
        'reorder' => true,
    ];

    protected $showOnlyParentItemsInBrowsers = true;

    protected $nestedItemsDepth = 1;
}
