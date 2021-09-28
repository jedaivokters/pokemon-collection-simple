<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pokemons extends Model
{
    protected $casts = [
        'metadata' => 'json',
    ];
    protected $fillable = ['name', 'nickname', 'metadata'];
}
