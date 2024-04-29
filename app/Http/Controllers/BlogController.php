<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Repositories\LynnRepository;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function __construct(LynnRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(Request $request, LynnRepository $repository)
    {
        $posts = $this->repository->allPosts();

        $posts->map(function ($post) {
            $post->custom_images = $post->image('custom_images');

            return $post;
        });

        return [
            'posts' => $posts,
        ];
    }

    public function show(Request $request, $slug)
    {
        $post = $this->repository->forSlug($slug);

        abort_unless($post, 404, 'Post missing');

        return [
            'post' => $post,
        ];
    }

    public function image(Request $request, $slug): JsonResponse
    {
        $post = $this->repository->forSlug($slug);

        abort_unless($post, 404, 'Image missing');

        return response()->json($post->image('custom_images', $request->role ?: 'default'));
    }
}
