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
use App\Helpers\DatabaseHelper;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth as FirebaseAuth;

class loginController extends Controller
{
    protected $firebaseAuth;

    public function __construct()
    {
        /* $firebase = (new Factory)->withServiceAccount(config('firebase.credentials.file'));
        $this->firebaseAuth = $firebase->createAuth(); */
    }

    public function register(Request $request)
    {
        /* $user = User::all(); */
        $user = User::create([
            'name' => $request->input('name'),
            'user' => $request->input('user'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);
        return $user;
    }
    public function registerWithGoogle(Request $request)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Token no proporcionado'], 401);
        }

        try {
            $verifiedIdToken = $this->firebaseAuth->verifyIdToken($token);
            $firebaseUserId = $verifiedIdToken->claims()->get('sub');

            $firebaseUser = $this->firebaseAuth->getUser($firebaseUserId);

            $user = User::updateOrCreate(
                ['email' => $firebaseUser->email],
                ['name' => $firebaseUser->displayName, 'firebase_uid' => $firebaseUserId]
            );

            return response()->json(['message' => 'Registro exitoso', 'user' => $user], 201);
        } catch (\Kreait\Firebase\Exception\Auth\FailedToVerifyToken $e) {
            return response()->json(['message' => 'Token inválido'], 401);
        }
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
            /* 'host' => env('DB_HOST', '127.0.0.1'), */
            'host' => env('DB_HOST', '195.35.25.196'),
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
            return response()->json(['message' => 'Login exitoso'], 200);
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
        /* print_r($kitchen); */
        $bd_account = DatabaseHelper::ConnectMaster($kitchen);
        DatabaseHelper::Connect($bd_account);

        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'Logout exitoso'
        ])->withCookie($cookie);
    }
}
