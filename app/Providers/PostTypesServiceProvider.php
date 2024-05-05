<?php

namespace App\Providers;

use Illuminate\Support\Arr;

use Illuminate\Support\ServiceProvider;

class PostTypesServiceProvider extends ServiceProvider
{
    /**
     * Register post types services.
     *
     * @return void
     */
    public function register()
    {
        /**
         * Register the post types assets.
         *
         * @return void
         */
        add_action('init', function () {
            $post_types = config('post-types.post_types');

            foreach ($post_types as $post_type => $args) {
                $names = Arr::pull($args, 'names');
                register_extended_post_type($post_type, $args, $names);
            }
        }, 100);

        /**
         * Register the taxonomies.
         *
         * @return void
         */
        add_action('init', function () {
            $taxonomies = config('post-types.taxonomies');

            foreach ($taxonomies as $taxonomy => $args) {
                foreach ($args['post_types'] as $post_type) {
                    $names = Arr::pull($args, 'names');
                    register_extended_taxonomy($taxonomy, $post_type, $args, $names);
                }
            }
        }, 100);
    }
}
