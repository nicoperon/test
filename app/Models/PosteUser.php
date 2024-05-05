<?php
namespace App\Models;

class PosteUser
{
    /**
     * Récupère tous les utilisateurs de WordPress.
     *
     * @return array
     */
    public static function getAllWordPressUsers()
    {
        require_once base_path('public/wp/wp-load.php');

        global $wpdb;
        $table_name = $wpdb->prefix . 'poste_users'; 
        $query = "SELECT * FROM {$table_name}"; 
        $results = $wpdb->get_results($query);
        return $results;

    }
}
