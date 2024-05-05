<?php

if (!defined('ABSPATH')) {
    exit;
}

// Register theme defaults.
add_action('after_setup_theme', static function () {
    show_admin_bar(false);

    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');

    register_nav_menus([
        'navigation' => __('Navigation'),
    ]);
});

add_action('admin_init', static function () {
    remove_menu_page('edit-comments.php'); // Comments
});

// Remove admin toolbar menu items.
add_action('admin_bar_menu', static function (WP_Admin_Bar $menu) {
    $menu->remove_node('comments');  // Comments
    $menu->remove_node('customize'); // Customize
    $menu->remove_node('themes');    // Themes
    $menu->remove_node('updates');   // Updates
    $menu->remove_node('wp-logo');   // WordPress Logo
}, 999);

add_action('wp_dashboard_setup', static function () {
    global $wp_meta_boxes;

    unset(
        $wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity'],
        $wp_meta_boxes['dashboard']['normal']['core']['dashboard_site_health'],
        $wp_meta_boxes['dashboard']['side']['core']['dashboard_primary'],
        $wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']
    );
});

add_theme_support('menus');
add_theme_support('widgets');

add_theme_support('title-tag');
add_theme_support('description');

// Removes from post and pages
add_action('init', 'remove_comment_support', 100);

function remove_comment_support(): void
{
    remove_post_type_support('post', 'comments');
    remove_post_type_support('page', 'comments');
}

// Removes from admin bar
function mytheme_admin_bar_render(): void
{
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('comments');
}

add_action('wp_before_admin_bar_render', 'mytheme_admin_bar_render');


add_theme_support('post-thumbnails');

// add options page
if (function_exists('acf_add_options_page')) {
    acf_add_options_page();
}

/* Autoriser les fichiers SVG */
add_filter('upload_mimes', static function ($mimes) {
    $mimes['svg'] = 'image/svg+xml';

    return $mimes;
});

// Miniatures
include "inc/miniatures.php";


/*
*******
Custom functions.php commence ici
*******
*/

/**
 * Add a separator between menu items
 */
function add_separator($items, $args)
{
    // only add if separator specified
    if ($args->separator) {
        $items = str_replace("</li>", '</li>' . $args->separator, $items);
        // but without the last one
        $items = substr($items, 0, strlen($items) - strlen($args->separator) - 1);
    }
    return $items;
}
add_filter('wp_nav_menu_items', 'add_separator', 10, 2);


/**
 * Add likes for articles
 */
include "inc/likes.php";
