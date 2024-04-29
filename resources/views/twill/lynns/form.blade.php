@extends('twill::layouts.form')

@section('contentFields')
    @formField('input', [
        'name' => 'title',
        'label' => 'Title',
        'required' => true,
        'maxlength' => 200
    ])

    @formField('input', [
        'name' => 'subtitle',
        'label' => 'Subtitle',
        'maxlength' => 200
    ])

    @formField('tags', [
        'label' => 'Tags',
    ])

    @formField('wysiwyg', [
        'name' => 'description',
        'label' => 'Description',
        'toolbarOptions' => [
            ['header' => [2, 3, 4, 5, 6, false]],
            'bold',
            'italic',
            'underline',
            'strike',
            'list-ordered',
            'list-unordered',
            'clean',
            'link',
            [ 'indent' => '-1'],
            [ 'indent' => '+1' ]
        ],
        'required' => true,
    ])

    @formField('medias', [
        'name' => 'custom_images',
        'label' => 'Custom Images',
    ])
@stop
