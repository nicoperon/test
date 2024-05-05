<?php

namespace App\Fakers;

use Faker\Factory;

class PosteUserFake {
    public function generate() {
        global $wpdb;
        $faker = Factory::create();
        
        $table_name = $wpdb->prefix . 'poste_users';

        for ($i = 0; $i < 10; $i++) {
            $wpdb->insert($table_name, [
                'nom' => $faker->lastName,
                'prenom' => $faker->firstName,
                'email' => $faker->email,
                'code_postal' => $faker->postcode,
                'user_id' => $faker->randomDigitNotNull,
                'coclico' => $faker->word,
                'derniere_connexion' => $faker->dateTimeThisYear()->format('Y-m-d H:i:s'),
                'date_cgu_signee' => $faker->dateTimeThisYear()->format('Y-m-d H:i:s'),
                'version_cgu_signee' => $faker->word
            ]);
        }
    }
}

