<?php

// Ajouter le champ "like" pour chaque article
function ajouter_champ_like()
{
    add_post_meta(get_the_ID(), 'likes_count', 0, true);
}
add_action('init', 'ajouter_champ_like');

function like_article($post_id = null, $user_id = null, $change_type = 'auto')
{
    if (is_user_logged_in()) {
        if ($post_id == null) {
            $post_id = get_the_ID();
        }
        if ($user_id == null) {
            $user_id = get_current_user_id();
        }

        $liked_by_user = get_user_meta($user_id, 'liked_articles', true);

        if (!is_array($liked_by_user)) {
            $liked_by_user = array();
        }

        if (!in_array($post_id, $liked_by_user)) {
            if ($change_type == 'unlike') return;

            $liked_by_user[] = $post_id;
            update_user_meta($user_id, 'liked_articles', $liked_by_user);

            $likes = get_post_meta($post_id, 'likes_count', true);
            $likes++;
            update_post_meta($post_id, 'likes_count', $likes);
        } else {
            // Unlike the article
            $key = array_search($post_id, $liked_by_user);
            unset($liked_by_user[$key]);
            update_user_meta($user_id, 'liked_articles', $liked_by_user);

            $likes = get_post_meta($post_id, 'likes_count', true);
            $likes--;
            update_post_meta($post_id, 'likes_count', $likes);
        }
    }
}

/**
 * Vérifier si l'article est liké par l'utilisateur
 */
function is_liked_by_user($post_id = null, $user_id = null)
{
    if (is_user_logged_in()) {
        if ($post_id == null) {
            $post_id = get_the_ID();
        }
        if ($user_id == null) {
            $user_id = get_current_user_id();
        }

        $liked_by_user = get_user_meta($user_id, 'liked_articles', true);

        if (!is_array($liked_by_user)) {
            $liked_by_user = array();
        }

        if (in_array($post_id, $liked_by_user)) {
            return true;
        }
    }

    return false;
}

/**
 * Ajax : Ajouter un like
 */
add_action('wp_ajax_add_like', 'ajax_add_like');
add_action('wp_ajax_nopriv_add_like', 'ajax_add_like');
function ajax_add_like()
{
    // check if user is logged in
    if (!is_user_logged_in()) {
        wp_send_json_error('Vous devez être connecté pour aimer un article.');
    }

    // check if post id is set
    if (!isset($_POST['post_id'])) {
        wp_send_json_error('Aucun article sélectionné.');
    }

    $change_type = 'auto';
    if (isset($_POST['change_type']) && in_array($_POST['change_type'], ['auto', 'like', 'unlike'])) {
        $change_type = $_POST['change_type'];
    }

    // like or unlike the post
    like_article($_POST['post_id'], null, $change_type);

    // return new like count
    $likes = get_post_meta($_POST['post_id'], 'likes_count', true);

    wp_send_json_success([
        'likes' =>      $likes,
        'isLiked' =>    is_liked_by_user($_POST['post_id']),
    ]);

    die();
}
