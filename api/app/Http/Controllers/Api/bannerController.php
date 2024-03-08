<?php

namespace App\Http\Controllers\Api;
use App\Helpers\DatabaseHelper;
use Illuminate\Support\Facades\Session;

use Illuminate\Support\Facades\Cookie;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Banner;

class bannerController extends Controller
{
    public function setup($kitchen)
    {
        $bd_account=DatabaseHelper::ConnectMaster($kitchen);
        DatabaseHelper::Connect($bd_account);
    }
    public function index($kitchen)
    {
        return Banner::all();
    }
    public function store(Request $request, $kitchen)
    {
        $this->setup($kitchen);
        $Banner = new Banner();
        $Banner->name = $request->name;
        if ($request->hasFile('img')) {
            $imagen = $request->file('img');
            $nombreImagen = $kitchen.'_'.$imagen->getClientOriginalName();
            $imagen->move(public_path('assets/banners'), $nombreImagen);
            $Banner->img = $nombreImagen;
        }
        $Banner->save();
        return response()->json(['mensaje' => 'Producto creado exitosamente']);
    }
    public function show(string $kitchen, string $id)
    {
        $this->setup($kitchen);
        $dato['Banner'] = Banner::find($id);
        return $dato;
    }
    public function update(Request $request, $kitchen, string $id )
    {
        $this->setup($kitchen);
        $name = $request->input('name');
        if ($request->hasFile('img')) {
            $img = $request->file('img');
            $nombreImagen = $kitchen.'_'.$img->getClientOriginalName();
            $img->move(public_path('assets/banners'), $nombreImagen);
        }
        $Banner = Banner::findOrFail($id);
        $Banner->name = $name;
        $Banner->img = $nombreImagen;
        $Banner->save();
        return response()->json(['mensaje' => 'Banner actualizado exitosamente']);
    }
    public function destroy(string $kitchen, string $id)
    {
        $this->setup($kitchen);
        $Banner = Banner::destroy($id);
        return $Banner;
    }
}