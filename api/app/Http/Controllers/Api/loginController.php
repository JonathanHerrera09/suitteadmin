<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use App\Models\Login;
use App\Models\User;

class loginController extends Controller
{
    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->input('name'),
            'user' => $request->input('user'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);
        return $user;
    }
    public function login(Request $request)
    {
        $cocina = $request->input('kitchen');
        $usuario = $request->input('user');
        $contraseña = $request->input('password');

        $account = Login::on('bd_master')->where('kitchen', $cocina)->first();

        if (!$account) {
            return response()->json(['message' => 'Cocina no encontrada'], 401);
        }
        Session::put('bd_account', $account->bd_account);
        $connection = $account->bd_account;
        config(['database.connections.dynamic' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => $connection,
            'username' => 'root',
            'password' => '',
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ]]);
        $users = DB::connection('dynamic')->select(...);
        if (Auth::attempt($request->only('user', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('jwt', $token, 1440);
            return response([
                'message' => $token,
                'kitchen' => $account->kitchen
            ])->withCookie($cookie);
            /*  return response()->json(['message' => 'Login exitoso'], 200); */
        } else {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }
    }
    public function user()
    {
        return Auth::user();
    }
    public function logout($kitchen)
    {
        $bd_account = DatabaseHelper::ConnectMaster($kitchen);
        DatabaseHelper::Connect($bd_account);

        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'Logout exitoso'
        ])->withCookie($cookie);
    }
}
