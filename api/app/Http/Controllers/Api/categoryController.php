<?php

namespace App\Http\Controllers\Api;
use App\Helpers\DatabaseHelper;
use Illuminate\Support\Facades\Session;

use Illuminate\Support\Facades\Cookie;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class categoryController extends Controller
{
    public function setup($kitchen)
    {
        $bd_account=DatabaseHelper::ConnectMaster($kitchen);
        DatabaseHelper::Connect($bd_account);
    }
    public function index($kitchen)
    {
        return Category::all();
    }
    public function store(Request $request, $kitchen)
    {
        $this->setup($kitchen);
        $Category = new Category();
        $Category->name = $request->name;
        if ($request->hasFile('img')) {
            $imagen = $request->file('img');
            $nombreImagen = $kitchen.'_'.$imagen->getClientOriginalName();
            $imagen->move(public_path('assets/categorys'), $nombreImagen);
            $Category->img = $nombreImagen;
        }
        $Category->save();
        return response()->json(['mensaje' => 'Producto creado exitosamente']);
    }
    public function show(string $kitchen, string $id)
    {
        $this->setup($kitchen);
        $dato['Category'] = Category::find($id);
        return $dato;
    }
    public function update(Request $request, $kitchen, string $id )
    {
        $this->setup($kitchen);
        $Category = Category::findOrFail($id);
        $name = $request->input('name');
        if ($request->hasFile('img')) {
            $img = $request->file('img');
            $nombreImagen = $kitchen.'_'.$img->getClientOriginalName();
            $img->move(public_path('assets/categorys'), $nombreImagen);
            $Category->img = $nombreImagen;
        }
        
        $Category->name = $name;
        $Category->save();
        return response()->json(['mensaje' => 'Categoria actualizado exitosamente']);
    }
    public function destroy(string $kitchen, string $id)
    {
        $this->setup($kitchen);
        $Category = Category::destroy($id);
        return $Category;
    }
}