<?php

namespace App\Http\Controllers\Api;
use App\Helpers\DatabaseHelper;
use Illuminate\Support\Facades\Session;

use Illuminate\Support\Facades\Cookie;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Config;

class configController extends Controller
{
    public function setup($kitchen)
    {
        $bd_account=DatabaseHelper::ConnectMaster($kitchen);
        DatabaseHelper::Connect($bd_account);
    }
    public function index($kitchen)
    {
	$this->setup($kitchen);
        return Config::find(1);
    }
    public function update(Request $request, $kitchen)
    {
        $this->setup($kitchen);
        $id = 1;
        $Config = Config::findOrFail($id);
        $company = $request->input('company');
        $color_nav = $request->input('color_nav');
        $color_cart = $request->input('color_cart');
        $color_btn_p = $request->input('color_btn_p');
        $color_btn_n = $request->input('color_btn_n');

        $schedules = $request->input('schedules');
        $address = $request->input('address');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $slogan	 = $request->input('slogan');
        $msgfinish = $request->input('msgfinish');
        $color_footer = $request->input('color_footer');
        $color_card = $request->input('color_card');
        $color_text_title = $request->input('color_text_title');
        $color_bag_title = $request->input('color_bag_title');
        if ($request->hasFile('favicon')) {
            $img = $request->file('favicon');
            $nombreImagen = $kitchen.'_'.$img->getClientOriginalName();
            $img->move(public_path('assets/favicons'), $nombreImagen);
            $Config->favicon = $nombreImagen;
        }
        $Config->company = $company;
        $Config->color_nav = $color_nav;
        $Config->color_cart = $color_cart;
        $Config->color_btn_p = $color_btn_p;
        $Config->color_btn_n = $color_btn_n;
        $Config->schedules = $schedules;
        $Config->address = $address;
        $Config->email = $email;
        $Config->phone = $phone;
        $Config->slogan = $slogan;
        $Config->msgfinish = $msgfinish;
        $Config->color_footer = $color_footer;
        $Config->color_card = $color_card;
        $Config->color_text_title = $color_text_title;
        $Config->color_bag_title = $color_bag_title;
        $Config->save();
        return response()->json(['mensaje' => 'la configuracion actualizado exitosamente']);
    }
}
