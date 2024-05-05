<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PosteUser; 
use App\Fakers\PosteUserFake;

use Faker\Factory;

class PosteUserController extends Controller
{
    /**
     * Récupère la liste des utilisateurs de la poste.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUsers()
    { 
        $users = PosteUser::getAllWordPressUsers();
        return response()->json($users);
    }

    /**
     * insère des données factices dans la table wp_poste_users.
     * 
     * @return \Illuminate\Http\Response
     */
    public function insertFakeData()
    {
        $userFake = new PosteUserFake();
        $userFake->generate();
    }


}
