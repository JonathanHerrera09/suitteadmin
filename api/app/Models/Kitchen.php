<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kitchen extends Model
{
    protected $table = 'orders';
    
    function get(){
        return static::all();
	}
}
