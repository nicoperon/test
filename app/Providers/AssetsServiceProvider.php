<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use function Roots\bundle;

class AssetsServiceProvider extends ServiceProvider
{
    /**
     * Register assets services.
     *
     * @return void
     */
    public function register()
    {
        /**
         * Register the theme assets.
         *
         * @return void
         */
        add_action('wp_enqueue_scripts', function () {
            bundle('app')->enqueue();

            remove_action('wp_body_open', 'wp_global_styles_render_svg_filters');
        }, 100);

        /**
         * Register the theme assets with the block editor.
         *
         * @return void
         */
        add_action('enqueue_block_editor_assets', function () {
            bundle('editor')->enqueue();
        }, 100);

        /**
         * Add the type="module" attribute to script tags that have the .mjs extension.
         */
        add_filter('script_loader_tag', function ($tag) {
            $hasModuleExtension = str_contains($tag, '.mjs"');

            $hasModuleAttribute = ! empty(array_filter(
                ['type="module"', 'type=module', "type='module'"],
                fn ($value) => str_contains($tag, $value)
            ));

            if (! $hasModuleExtension || $hasModuleAttribute) {
                return $tag;
            }

            return str_replace(' src=', ' type=module src=', $tag);
        }, 10, 2);

        /**
         * WP 5.9 duotone SVGs in footer fix
         *
         * @link https://github.com/WordPress/gutenberg/issues/38299#issuecomment-1025520487
         */
        add_action('after_setup_theme', function () {
            // remove SVG and global styles
            remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');

            // remove wp_footer actions which add's global inline styles
            remove_action('wp_footer', 'wp_enqueue_global_styles', 1);

            // remove render_block filters which adding unnecessary stuff
            remove_filter('render_block', 'wp_render_duotone_support');
            remove_filter('render_block', 'wp_restore_group_inner_container');
            remove_filter('render_block', 'wp_render_layout_support_flag');
        });
    }
}
