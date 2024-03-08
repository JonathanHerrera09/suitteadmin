<?php

namespace App\Http\Controllers\Api;
use App\Helpers\DatabaseHelper;
use Illuminate\Support\Facades\Session;

use Illuminate\Support\Facades\Cookie;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TypeService;

class typeServiceController extends Controller
{
    public function setup($kitchen)
    {
        $bd_account=DatabaseHelper::ConnectMaster($kitchen);
        DatabaseHelper::Connect($bd_account);
    }
    public function index($kitchen)
    {
        return TypeService::all();
    }
    public function store(Request $request, $kitchen)
    {
        $this->setup($kitchen);
        $TypeService = new TypeService();
        $name = $request->input('name');
        $TypeService->name =  $name;
        $TypeService->save();
        return $TypeService; 
    }
    public function show(string $kitchen, string $id)
    {
        $this->setup($kitchen);
        $dato['typeService'] = TypeService::find($id);
        return $dato;
    }
    public function update(Request $request, $kitchen, string $id )
    {
        $this->setup($kitchen);
        $TypeService = TypeService::findOrFail($request->id);
        $TypeService->name = $request->name;
        $TypeService->save();
        return $TypeService;
    }
    public function destroy(string $kitchen, string $id)
    {
        $this->setup($kitchen);
        $TypeService = TypeService::destroy($id);
        return $TypeService;
    }
}