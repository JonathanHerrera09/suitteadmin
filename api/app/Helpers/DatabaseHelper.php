<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use App\Models\Login;

class DatabaseHelper
{
    public static function Connect($databaseName)
    {
        Config::set('database.connections.dynamic', [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => $databaseName,
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ]);
        DB::setDefaultConnection('dynamic');
    }
    public static function ConnectMaster($cocina)
    {
        $account = Login::on('bd_master')->where('kitchen', $cocina)->first();

        if (!$account) {
            return response()->json(['message' => 'Cocina no encontrada'], 401);
        }else{
            return $account->bd_account;
        }
        
    }
}
