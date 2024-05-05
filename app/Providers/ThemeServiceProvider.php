<?php

namespace App\Providers;

use Roots\Acorn\Sage\SageServiceProvider;

use Illuminate\Support\Collection;

class ThemeServiceProvider extends SageServiceProvider
{
    /**
     * Register theme services.
     *
     * @return void
     */
    public function register()
    {
        parent::register();

        /**
         * Register theme supports from config
         */
        add_action('after_setup_theme', function (): void {
            Collection::make(config('theme.support'))
                ->map(function ($params, $feature) {
                    if (is_array($params)) {
                        return [$feature, $params];
                    } else {
                        return $params;
                    }
                })
                ->each(function ($params) {
                    add_theme_support(...(array)$params);
                });


            Collection::make(config('theme.remove'))
            ->map(fn ($entry) => is_string($entry) ? [$entry] : $entry)
            ->each(fn ($params) => remove_theme_support(...$params));

            register_nav_menus(config('theme.menus'));
        }, 20);

        /**
         * Register sidebars from config
         */
        add_action('widgets_init', function (): void {
            Collection::make(config('theme.sidebar.register'))->map(function ($instance) {
                register_sidebar(array_merge(config('theme.sidebar.config'), $instance));
            });
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }
}
